package com.quanlytro.service;

import com.quanlytro.model.Post;
import com.quanlytro.model.PostStatus;
import com.quanlytro.model.User;
import com.quanlytro.repository.PostRepository;
import com.quanlytro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PostService {
    
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
    
    public List<Post> getPostsByStatus(PostStatus status) {
        return postRepository.findByStatus(status);
    }
    
    public List<Post> getPendingPosts() {
        return postRepository.findByStatus(PostStatus.PENDING);
    }
    
    @NonNull
    public Post getPostById(@NonNull String id) {
        return Objects.requireNonNull(postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found")));
    }
    
    @Transactional
    @NonNull
    public Post approvePost(@NonNull String id) {
        Post post = getPostById(id);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User admin = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        post.setStatus(PostStatus.APPROVED);
        post.setApprovedBy(admin);
        post.setApprovedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        
        return postRepository.save(post);
    }
    
    @Transactional
    @NonNull
    public Post rejectPost(@NonNull String id, @NonNull String reason) {
        Post post = getPostById(id);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User admin = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        post.setStatus(PostStatus.REJECTED);
        post.setRejectionReason(reason);
        post.setApprovedBy(admin);
        post.setUpdatedAt(LocalDateTime.now());
        
        return postRepository.save(post);
    }
    
    @Transactional
    @NonNull
    public Post markAsSpam(@NonNull String id) {
        Post post = getPostById(id);
        post.setIsSpam(true);
        post.setStatus(PostStatus.REJECTED);
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }
    
    @Transactional
    @NonNull
    public Post markAsDuplicate(@NonNull String id) {
        Post post = getPostById(id);
        post.setIsDuplicate(true);
        post.setStatus(PostStatus.REJECTED);
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }
    
    @Transactional
    @NonNull
    public Post markInappropriateContent(@NonNull String id, boolean hasInappropriateImages, boolean hasFakePrice, boolean hasWrongAddress) {
        Post post = getPostById(id);
        post.setHasInappropriateImages(hasInappropriateImages);
        post.setHasFakePrice(hasFakePrice);
        post.setHasWrongAddress(hasWrongAddress);
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }
}

