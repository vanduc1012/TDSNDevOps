package com.quanlytro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    private String id;
    
    @DBRef
    private Room room; // Phòng trọ được đăng
    
    @DBRef
    private User owner; // Chủ trọ đăng bài
    
    private PostStatus status = PostStatus.PENDING; // Trạng thái duyệt
    
    private String rejectionReason; // Lý do từ chối (nếu bị từ chối)
    
    private LocalDateTime submittedAt = LocalDateTime.now(); // Ngày gửi duyệt
    
    private LocalDateTime approvedAt; // Ngày được duyệt
    
    @DBRef
    private User approvedBy; // Admin duyệt bài
    
    private Boolean isSpam = false; // Đánh dấu spam
    
    private Boolean isDuplicate = false; // Đánh dấu trùng lặp
    
    private Boolean hasInappropriateImages = false; // Có ảnh nhạy cảm
    
    private Boolean hasFakePrice = false; // Giá phòng giả
    
    private Boolean hasWrongAddress = false; // Địa chỉ không đúng
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
}

