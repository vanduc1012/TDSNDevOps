package com.quanlytro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    private String id;
    
    @DBRef
    private Room room; // Phòng được đặt
    
    @DBRef
    private User tenant; // Khách thuê
    
    @DBRef
    private User owner; // Chủ trọ
    
    private BookingStatus status = BookingStatus.PENDING; // Trạng thái đơn
    
    private LocalDate checkInDate; // Ngày nhận phòng
    
    private LocalDate checkOutDate; // Ngày trả phòng
    
    private BigDecimal totalAmount; // Tổng tiền
    
    private BigDecimal deposit; // Tiền đặt cọc
    
    private PaymentMethod paymentMethod; // Phương thức thanh toán
    
    private PaymentStatus paymentStatus = PaymentStatus.PENDING; // Trạng thái thanh toán
    
    private String transactionId; // Mã giao dịch (nếu chuyển khoản)
    
    private String notes; // Ghi chú
    
    private String cancellationReason; // Lý do hủy
    
    @DBRef
    private User approvedBy; // Admin duyệt đơn
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
}

