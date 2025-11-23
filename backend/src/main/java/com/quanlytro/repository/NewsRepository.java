package com.quanlytro.repository;

import com.quanlytro.model.News;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends MongoRepository<News, String> {
    List<News> findByIsPublished(Boolean isPublished);
    List<News> findByCategory(String category);
}

