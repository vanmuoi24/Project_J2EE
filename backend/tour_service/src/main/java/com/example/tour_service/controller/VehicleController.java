package com.example.tour_service.controller;

import com.example.tour_service.dto.response.ApiResponse;
import com.example.tour_service.dto.request.VehicleRequest;
import com.example.tour_service.dto.response.VehicleResponse;
import com.example.tour_service.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vehicles")
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService vehicleService;

    @PostMapping
    public ApiResponse<VehicleResponse> createVehicle(@RequestBody VehicleRequest request) {
        return ApiResponse.<VehicleResponse>builder()
                .result(vehicleService.createVehicle(request))
                .message("Created Successfully")
                .build();
    }
}
