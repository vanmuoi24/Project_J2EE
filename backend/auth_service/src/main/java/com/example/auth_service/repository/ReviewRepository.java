package com.example.auth_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auth_service.entity.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByTourIdOrderByCreatedAtDesc(Long tourId);
    
    List<Review> findByTourId(Long tourId);
}