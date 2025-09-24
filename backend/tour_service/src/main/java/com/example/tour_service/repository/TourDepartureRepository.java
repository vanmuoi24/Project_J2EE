package com.example.tour_service.repository;

import com.example.tour_service.entity.TourDeparture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourDepartureRepository extends JpaRepository<TourDeparture, Integer> {
    int countByTourId(int tourId);
}
