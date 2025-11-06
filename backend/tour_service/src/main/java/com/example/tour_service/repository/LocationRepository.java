package com.example.tour_service.repository;

import com.example.tour_service.entity.Location;
import com.example.tour_service.enums.LocationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Integer> {
    List<Location> findByType(LocationType type);
    List<Location> findByTypeAndCityContainingIgnoreCase(LocationType type, String cityKeyword);
    List<Location> findByTypeAndCityContainsIgnoreCase(LocationType type, String cityKeyword);
}
