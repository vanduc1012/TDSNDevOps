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
import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    private String id;
    
    @Indexed
    private String roomNumber; // Số phòng
    
    @DBRef
    private User owner; // Chủ trọ
    
    private String name; // Tên phòng (theo yêu cầu)
    
    private String title; // Tiêu đề phòng
    
    private String description; // Mô tả chi tiết
    
    private BigDecimal price; // Giá thuê/tháng
    
    private BigDecimal area; // Diện tích (m²)
    
    private Integer bedrooms; // Số phòng ngủ (theo yêu cầu)
    
    private Integer bathrooms; // Số phòng tắm (theo yêu cầu)
    
    private String address; // Địa chỉ
    
    private String district; // Quận/Huyện
    
    private String city; // Thành phố
    
    private String ward; // Phường/Xã
    
    private List<String> amenities = new ArrayList<>(); // Tiện nghi: ["Wifi", "Điều hòa", "Máy nước nóng", ...]
    
    private List<String> images = new ArrayList<>(); // Danh sách URL ảnh
    
    private RoomStatus status = RoomStatus.AVAILABLE; // Trạng thái phòng
    
    private Boolean isActive = true; // Ẩn/hiện phòng
    
    private Integer capacity; // Số người ở tối đa
    
    private String direction; // Hướng phòng: "Đông", "Tây", "Nam", "Bắc"
    
    private Integer floor; // Tầng
    
    private Boolean hasElevator = false; // Có thang máy
    
    private Boolean hasParking = false; // Có chỗ để xe
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    private LocalDateTime expiresAt; // Ngày hết hạn đăng tin (nếu có)
}

