package com.quanlytro.service;

import com.quanlytro.dto.CreateOrderRequest;
import com.quanlytro.model.*;
import com.quanlytro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final PhongTroRepository tableRepository;
    private final MenuItemRepository menuItemRepository;
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public List<Order> getOrdersByTable(@NonNull String tableId) {
        return orderRepository.findByTableId(tableId);
    }
    
    @NonNull
    public Order getOrderById(@NonNull String id) {
        return Objects.requireNonNull(orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found")));
    }
    
    @Transactional
    @NonNull
    public Order createOrder(@NonNull CreateOrderRequest request) {
        String username = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = Objects.requireNonNull(userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found")));
        
        String tableId = Objects.requireNonNull(request.getTableId(), "Table ID is required");
        PhongTro table = Objects.requireNonNull(tableRepository.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found")));
        
        if (table.getStatus() != TableStatus.AVAILABLE) {
            throw new RuntimeException("Table is not available");
        }
        
        Order order = new Order();
        order.setUser(user);
        order.setTable(table);
        order.setStatus(OrderStatus.PENDING);
        order.setOrderTime(LocalDateTime.now());
        
        order = orderRepository.save(order);
        
        for (CreateOrderRequest.OrderItemRequest itemRequest : request.getItems()) {
            String menuItemId = Objects.requireNonNull(itemRequest.getMenuItemId(), "Menu item ID is required");
            MenuItem menuItem = Objects.requireNonNull(menuItemRepository.findById(menuItemId)
                    .orElseThrow(() -> new RuntimeException("Menu item not found")));
            
            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(menuItem.getPrice());
            String notes = itemRequest.getNotes();
            if (notes != null) orderItem.setNotes(notes);
            
            order.getItems().add(orderItem);
        }
        
        order.calculateTotal();
        order = orderRepository.save(order);
        
        // Update table status
        table.setStatus(TableStatus.OCCUPIED);
        tableRepository.save(table);
        
        return order;
    }
    
    @Transactional
    @NonNull
    public Order updateOrderStatus(@NonNull String id, @NonNull OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        
        if (status == OrderStatus.COMPLETED) {
            order.setCompletedTime(LocalDateTime.now());
            // Update table status to AVAILABLE (đã thanh toán, bàn trống)
            PhongTro table = order.getTable();
            if (table != null) {
                table.setStatus(TableStatus.AVAILABLE);
                tableRepository.save(table);
            }
        } else if (status == OrderStatus.CANCELLED) {
            // Nếu hủy order, trả bàn về trạng thái trống
            PhongTro table = order.getTable();
            if (table != null) {
                table.setStatus(TableStatus.AVAILABLE);
                tableRepository.save(table);
            }
        }
        
        return orderRepository.save(order);
    }
    
    public List<Order> getMyOrders() {
        String username = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = Objects.requireNonNull(userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found")));
        String userId = Objects.requireNonNull(user.getId(), "User ID is required");
        return orderRepository.findByUserId(userId);
    }
    
    @Transactional
    @NonNull
    public Order transferTable(@NonNull String orderId, @NonNull String newTableId) {
        Order order = getOrderById(orderId);
        
        // Kiểm tra đơn hàng phải ở trạng thái PENDING
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Chỉ có thể chuyển bàn cho đơn hàng đang chờ");
        }
        
        // Lấy bàn cũ và bàn mới
        PhongTro oldTable = order.getTable();
        PhongTro newTable = Objects.requireNonNull(tableRepository.findById(newTableId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bàn mới")));
        
        // Kiểm tra bàn mới phải trống
        if (newTable.getStatus() != TableStatus.AVAILABLE) {
            throw new RuntimeException("Bàn mới không trống, không thể chuyển");
        }
        
        // Kiểm tra không chuyển sang cùng bàn
        if (oldTable != null && oldTable.getId() != null) {
            String oldTableId = Objects.requireNonNull(oldTable.getId());
            if (oldTableId.equals(newTableId)) {
                throw new RuntimeException("Không thể chuyển sang cùng bàn");
            }
        }
        
        // Cập nhật bàn cũ về trạng thái trống
        if (oldTable != null) {
            oldTable.setStatus(TableStatus.AVAILABLE);
            tableRepository.save(oldTable);
        }
        
        // Cập nhật bàn mới thành đang sử dụng
        newTable.setStatus(TableStatus.OCCUPIED);
        tableRepository.save(newTable);
        
        // Cập nhật order với bàn mới
        order.setTable(newTable);
        return orderRepository.save(order);
    }
}
