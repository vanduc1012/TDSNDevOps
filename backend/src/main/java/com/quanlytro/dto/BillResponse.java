package com.quanlytro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillResponse {
    private String id;
    private String roomId;
    private String roomName;
    private String month;
    private BigDecimal electricity;
    private BigDecimal water;
    private String description;
    private BigDecimal amount;
    private Boolean paidStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

