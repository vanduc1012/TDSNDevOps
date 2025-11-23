package com.quanlytro.service;

import com.quanlytro.dto.BillRequest;
import com.quanlytro.dto.BillResponse;
import com.quanlytro.model.Bill;
import com.quanlytro.model.Room;
import com.quanlytro.repository.BillRepository;
import com.quanlytro.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BillService {
    
    private final BillRepository billRepository;
    private final RoomRepository roomRepository;
    
    @Transactional
    @NonNull
    public BillResponse createBill(@NonNull BillRequest request) {
        String roomId = Objects.requireNonNull(request.getRoomId(), "Room ID is required");
        log.info("Creating bill for room: {}, month: {}", roomId, request.getMonth());
        
        Room room = Objects.requireNonNull(roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found")));
        
        // Kiểm tra hóa đơn đã tồn tại chưa
        String month = Objects.requireNonNull(request.getMonth(), "Month is required");
        billRepository.findByRoomIdAndMonth(roomId, month)
                .ifPresent(bill -> {
                    throw new RuntimeException("Hóa đơn cho tháng " + month + " đã tồn tại");
                });
        
        Bill bill = new Bill();
        bill.setRoom(room);
        bill.setMonth(month);
        bill.setElectricity(request.getElectricity());
        bill.setWater(request.getWater());
        bill.setDescription(request.getDescription());
        bill.setAmount(request.getAmount());
        bill.setPaidStatus(false);
        
        Bill savedBill = billRepository.save(bill);
        log.info("Bill created successfully with ID: {}", savedBill.getId());
        
        BillResponse response = mapToResponse(savedBill);
        return Objects.requireNonNull(response);
    }
    
    public List<BillResponse> getBillsByRoom(@NonNull String roomId) {
        log.info("Getting bills for room: {}", roomId);
        return billRepository.findByRoomId(roomId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    @NonNull
    public BillResponse updateBillStatus(@NonNull String id, @NonNull Boolean paidStatus) {
        log.info("Updating bill status: {} to {}", id, paidStatus);
        Bill bill = Objects.requireNonNull(billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found")));
        bill.setPaidStatus(paidStatus);
        Bill updatedBill = billRepository.save(bill);
        BillResponse response = mapToResponse(updatedBill);
        return Objects.requireNonNull(response);
    }
    
    private BillResponse mapToResponse(Bill bill) {
        BillResponse response = new BillResponse();
        response.setId(bill.getId());
        response.setRoomId(bill.getRoom() != null ? bill.getRoom().getId() : null);
        response.setRoomName(bill.getRoom() != null ? 
                (bill.getRoom().getName() != null ? bill.getRoom().getName() : bill.getRoom().getTitle()) : null);
        response.setMonth(bill.getMonth());
        response.setElectricity(bill.getElectricity());
        response.setWater(bill.getWater());
        response.setDescription(bill.getDescription());
        response.setAmount(bill.getAmount());
        response.setPaidStatus(bill.getPaidStatus());
        response.setCreatedAt(bill.getCreatedAt());
        response.setUpdatedAt(bill.getUpdatedAt());
        return response;
    }
}

