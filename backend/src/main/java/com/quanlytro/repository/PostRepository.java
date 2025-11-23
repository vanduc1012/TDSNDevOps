package com.quanlytro.repository;

import com.quanlytro.model.Post;
import com.quanlytro.model.PostStatus;
import com.quanlytro.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByStatus(PostStatus status);
    List<Post> findByOwner(User owner);
    List<Post> findByIsSpam(Boolean isSpam);
    List<Post> findByIsDuplicate(Boolean isDuplicate);
}

