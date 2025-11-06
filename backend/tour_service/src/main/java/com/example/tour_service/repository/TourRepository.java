package com.example.tour_service.repository;

import com.example.tour_service.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<Tour, Integer> {
}
