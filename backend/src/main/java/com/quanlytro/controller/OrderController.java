package com.quanlytro.controller;

import com.quanlytro.dto.CreateOrderRequest;
import com.quanlytro.model.Order;
import com.quanlytro.model.OrderStatus;
import com.quanlytro.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
    
    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders() {
        return ResponseEntity.ok(orderService.getMyOrders());
    }
    
    @GetMapping("/table/{tableId}")
    public ResponseEntity<List<Order>> getOrdersByTable(@PathVariable @NonNull String tableId) {
        return ResponseEntity.ok(orderService.getOrdersByTable(tableId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable @NonNull String id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody @NonNull CreateOrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable @NonNull String id, @RequestBody Map<String, String> request) {
        String statusStr = Objects.requireNonNull(request.get("status"), "Status is required");
        OrderStatus status = OrderStatus.valueOf(statusStr);
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
    
    @PatchMapping("/{id}/transfer-table")
    public ResponseEntity<Order> transferTable(@PathVariable @NonNull String id, @RequestBody Map<String, String> request) {
        String newTableId = Objects.requireNonNull(request.get("newTableId"), "newTableId is required");
        return ResponseEntity.ok(orderService.transferTable(id, newTableId));
    }
}
