package com.quanlytro.controller;

import com.quanlytro.model.User;
import com.quanlytro.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class UserManagementController {
    
    private final UserManagementService userManagementService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable @NonNull String id) {
        User user = userManagementService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/{id}/lock")
    public ResponseEntity<User> lockUser(@PathVariable @NonNull String id) {
        User user = userManagementService.lockUser(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/{id}/unlock")
    public ResponseEntity<User> unlockUser(@PathVariable @NonNull String id) {
        User user = userManagementService.unlockUser(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/{id}/reset-password")
    public ResponseEntity<Map<String, String>> resetUserPassword(@PathVariable @NonNull String id) {
        String newPassword = Objects.requireNonNull(userManagementService.resetUserPassword(id), "Password is required");
        Map<String, String> response = new HashMap<>();
        response.put("newPassword", newPassword);
        response.put("message", "Password reset successfully");
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable @NonNull String id) {
        userManagementService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

