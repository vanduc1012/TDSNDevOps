package com.quanlytro.controller;

import com.quanlytro.dto.BillRequest;
import com.quanlytro.dto.BillResponse;
import com.quanlytro.service.BillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
@Slf4j
public class BillController {
    
    private final BillService billService;
    
    @PostMapping
    public ResponseEntity<BillResponse> createBill(@Valid @RequestBody @NonNull BillRequest request) {
        log.info("POST /api/bills - Creating bill for room: {}, month: {}", request.getRoomId(), request.getMonth());
        BillResponse response = billService.createBill(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<BillResponse>> getBillsByRoom(@PathVariable @NonNull String roomId) {
        log.info("GET /api/bills/room/{}", roomId);
        return ResponseEntity.ok(billService.getBillsByRoom(roomId));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<BillResponse> updateBillStatus(
            @PathVariable @NonNull String id,
            @RequestBody Map<String, Boolean> request) {
        log.info("PUT /api/bills/{}/status - Updating status", id);
        Boolean paidStatus = Objects.requireNonNull(request.get("paidStatus"), "paidStatus is required");
        return ResponseEntity.ok(billService.updateBillStatus(id, paidStatus));
    }
}

