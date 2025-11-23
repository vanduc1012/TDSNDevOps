package com.quanlytro.controller;

import com.quanlytro.model.Post;
import com.quanlytro.model.PostStatus;
import com.quanlytro.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    
    private final PostService postService;
    
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Post>> getPostsByStatus(@PathVariable PostStatus status) {
        return ResponseEntity.ok(postService.getPostsByStatus(status));
    }
    
    @GetMapping("/pending")
    public ResponseEntity<List<Post>> getPendingPosts() {
        return ResponseEntity.ok(postService.getPendingPosts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable @NonNull String id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }
    
    @PostMapping("/{id}/approve")
    public ResponseEntity<Post> approvePost(@PathVariable @NonNull String id) {
        return ResponseEntity.ok(postService.approvePost(id));
    }
    
    @PostMapping("/{id}/reject")
    public ResponseEntity<Post> rejectPost(@PathVariable @NonNull String id, @RequestBody Map<String, String> request) {
        String reason = Objects.requireNonNull(request.get("reason"), "Reason is required");
        return ResponseEntity.ok(postService.rejectPost(id, reason));
    }
    
    @PostMapping("/{id}/mark-spam")
    public ResponseEntity<Post> markAsSpam(@PathVariable @NonNull String id) {
        return ResponseEntity.ok(postService.markAsSpam(id));
    }
    
    @PostMapping("/{id}/mark-duplicate")
    public ResponseEntity<Post> markAsDuplicate(@PathVariable @NonNull String id) {
        return ResponseEntity.ok(postService.markAsDuplicate(id));
    }
    
    @PostMapping("/{id}/mark-inappropriate")
    public ResponseEntity<Post> markInappropriateContent(@PathVariable @NonNull String id, @RequestBody Map<String, Boolean> request) {
        return ResponseEntity.ok(postService.markInappropriateContent(
            id,
            request.getOrDefault("hasInappropriateImages", false),
            request.getOrDefault("hasFakePrice", false),
            request.getOrDefault("hasWrongAddress", false)
        ));
    }
}

