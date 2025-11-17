package com.example.tour_service.controller;

import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.request.LocationRequest;
import com.example.tour_service.dto.response.LocationResponse;
import com.example.tour_service.repository.LocationRepository;
import com.example.tour_service.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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

    @PutMapping("/{id}")
    public ApiResponse<LocationResponse> updateLocation(@PathVariable int id, @RequestBody LocationRequest request) {
        return ApiResponse.<LocationResponse>builder()
                .result(locationService.updateLocation(id, request))
                .message("Updated Successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteLocation(@PathVariable int id) {
        locationService.deleteLocation(id);
        return ApiResponse.<Void>builder()
                .message("Deleted Successfully")
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<LocationResponse>> getAllLocation() {
        return ApiResponse.<List<LocationResponse>>builder()
                .result(locationService.getAllLocation())
                .message("Fetched All Locations")
                .build();
    }

    @GetMapping("/departures")
    public ApiResponse<List<LocationResponse>> getAllDepartureLocations() {
        return ApiResponse.<List<LocationResponse>>builder()
                .result(locationService.getAllDepartureLocations())
                .message("Fetched All Departure Locations")
                .build();
    }

    @GetMapping("/destinations")
    public ApiResponse<List<LocationResponse>> getAllDestinationLocations() {
        return ApiResponse.<List<LocationResponse>>builder()
                .result(locationService.getAllDestinationLocations())
                .message("Fetched All Destination Locations")
                .build();
    }
}