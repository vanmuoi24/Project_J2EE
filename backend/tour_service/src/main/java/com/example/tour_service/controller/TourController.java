package com.example.tour_service.controller;

import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.request.TourRequest;
import com.example.tour_service.dto.response.TourResponse;
import com.example.tour_service.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tours")
@RequiredArgsConstructor
public class TourController {

    private final TourService tourService;

    @PostMapping
    public ApiResponse<TourResponse> createTour(@RequestBody TourRequest request) {
        return ApiResponse.<TourResponse>builder()
                .result(tourService.createTour(request))
                .message("Created successfully")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<TourResponse> getTourById(
            @PathVariable Integer id,
            @RequestParam(defaultValue = "false") boolean includePrice
    ) {
        return ApiResponse.<TourResponse>builder()
                .result(tourService.getTourById(id, includePrice))
                .message("Got successfully")
                .build();
    }
}
