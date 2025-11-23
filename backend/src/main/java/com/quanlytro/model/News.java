package com.quanlytro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "news")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class News {
    @Id
    private String id;
    
    private String title; // Tiêu đề
    
    private String content; // Nội dung
    
    private String summary; // Tóm tắt
    
    private String category; // Danh mục: "Tin tức", "Hướng dẫn", "SEO"
    
    private List<String> tags = new ArrayList<>(); // Tags cho SEO
    
    private String imageUrl; // Ảnh đại diện
    
    private String slug; // URL thân thiện SEO
    
    private Boolean isPublished = false; // Đã xuất bản
    
    private Integer viewCount = 0; // Lượt xem
    
    @DBRef
    private User author; // Người viết
    
    private LocalDateTime publishedAt; // Ngày xuất bản
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
}

