package com.quanlytro.repository;

import com.quanlytro.model.Review;
import com.quanlytro.model.Room;
import com.quanlytro.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByRoom(Room room);
    List<Review> findByReviewer(User reviewer);
    List<Review> findByIsReported(Boolean isReported);
    List<Review> findByIsViolated(Boolean isViolated);
    List<Review> findByIsDeleted(Boolean isDeleted);
}

