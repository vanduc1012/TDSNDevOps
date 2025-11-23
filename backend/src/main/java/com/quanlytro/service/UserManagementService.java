package com.quanlytro.service;

import com.quanlytro.model.User;
import com.quanlytro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserManagementService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @NonNull
    public User getUserById(@NonNull String id) {
        return Objects.requireNonNull(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found")));
    }
    
    @Transactional
    @NonNull
    public User lockUser(@NonNull String id) {
        User user = Objects.requireNonNull(getUserById(id));
        // Có thể thêm field isLocked vào User model
        // user.setIsLocked(true);
        return Objects.requireNonNull(userRepository.save(user));
    }
    
    @Transactional
    @NonNull
    public User unlockUser(@NonNull String id) {
        User user = Objects.requireNonNull(getUserById(id));
        // user.setIsLocked(false);
        return Objects.requireNonNull(userRepository.save(user));
    }
    
    @Transactional
    @NonNull
    public String resetUserPassword(@NonNull String id) {
        User user = Objects.requireNonNull(getUserById(id));
        String newPassword = Objects.requireNonNull(UUID.randomUUID().toString().substring(0, 8));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return newPassword;
    }
    
    @Transactional
    public void deleteUser(@NonNull String id) {
        User user = Objects.requireNonNull(getUserById(id));
        userRepository.delete(user);
    }
}

