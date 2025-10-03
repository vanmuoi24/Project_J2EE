package com.example.tour_service.controller;

import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.request.LocationRequest;
import com.example.tour_service.dto.response.LocationResponse;
import com.example.tour_service.repository.LocationRepository;
import com.example.tour_service.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.xml.stream.Location;

@RestController
@RequestMapping("locations")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @PostMapping
    public ApiResponse<LocationResponse> createLocation(@RequestBody LocationRequest request) {
        return ApiResponse.<LocationResponse>builder()
                .result(locationService.createLocation(request))
                .message("Created Successfully")
                .build();
    }
}
