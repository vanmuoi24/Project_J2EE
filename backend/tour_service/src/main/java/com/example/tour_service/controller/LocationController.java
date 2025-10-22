package com.example.tour_service.controller;

import com.example.tour_service.dto.response.ApiResponse;
import com.example.tour_service.dto.request.LocationRequest;
import com.example.tour_service.dto.response.LocationResponse;
import com.example.tour_service.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD

import java.util.List;

=======
import java.util.List;
import javax.xml.stream.Location;
>>>>>>> d3fdc808e040ae78e1954bf50f62a626bcf5237c
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
