package com.quanlytro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    private String id;
    
    @DBRef
    private Room room; // Phòng được đánh giá
    
    @DBRef
    private User reviewer; // Người đánh giá
    
    private Integer rating; // Điểm đánh giá (1-5)
    
    private String comment; // Nội dung đánh giá
    
    private Boolean isVerified = false; // Đã xác thực (đã thuê phòng)
    
    private Boolean isReported = false; // Bị báo cáo
    
    private String reportReason; // Lý do báo cáo
    
    private Boolean isViolated = false; // Vi phạm quy định
    
    private Boolean isDeleted = false; // Đã xóa (soft delete)
    
    @DBRef
    private User deletedBy; // Admin xóa
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
}

