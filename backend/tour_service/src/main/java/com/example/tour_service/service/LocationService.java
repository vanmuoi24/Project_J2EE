package com.example.tour_service.service;

import com.example.tour_service.dto.request.LocationRequest;
import com.example.tour_service.dto.request.VehicleRequest;
import com.example.tour_service.dto.response.LocationResponse;
import com.example.tour_service.dto.response.VehicleResponse;
import com.example.tour_service.entity.Location;
import com.example.tour_service.entity.Vehicle;
import com.example.tour_service.repository.LocationRepository;
import com.example.tour_service.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public LocationResponse createLocation(LocationRequest request) {
        Location location = Location.builder()
                .city(request.getCity())
                .type(request.getType())
                .build();
        Location saved = locationRepository.save(location);

        return toResponse(saved);
    }

    private LocationResponse toResponse(Location location) {
        return LocationResponse.builder()
                .city(location.getCity())
                .type(location.getType())
                .build();
    }
}
