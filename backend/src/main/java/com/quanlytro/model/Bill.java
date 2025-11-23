package com.quanlytro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "bills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
    @Id
    private String id;
    
    @DBRef
    @Indexed
    private Room room; // Phòng
    
    private String month; // Tháng (format: "YYYY-MM")
    
    private BigDecimal electricity; // Số điện (kWh)
    
    private BigDecimal water; // Số nước (m³)
    
    private String description; // Mô tả
    
    private BigDecimal amount; // Tổng tiền
    
    private Boolean paidStatus = false; // Trạng thái thanh toán
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
}

