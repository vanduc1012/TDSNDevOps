package com.quanlytro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String username;
    
    private String name; // Tên (theo yêu cầu)
    
    private String fullName; // Tên đầy đủ
    
    private String password;
    
    @Indexed(unique = true)
    private String email;
    
    private String phone;
    
    private Role role = Role.USER;
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
