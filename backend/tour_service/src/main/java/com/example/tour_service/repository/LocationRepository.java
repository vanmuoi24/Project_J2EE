package com.example.tour_service.repository;

import com.example.tour_service.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Integer> {
}
