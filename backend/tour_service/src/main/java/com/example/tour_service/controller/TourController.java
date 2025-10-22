package com.example.tour_service.controller;

import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.request.TourRequest;
import com.example.tour_service.dto.response.TourResponse;
import com.example.tour_service.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tours")
@RequiredArgsConstructor
public class TourController {

    private final TourService tourService;

    @GetMapping("/{id}")
    public ApiResponse<TourResponse> getTourById(@PathVariable Integer id) {
        return ApiResponse. <TourResponse>builder()
                .result(tourService.getTourById(id))
                .message("Got successfully")
                .build();
    }

    @GetMapping("/list")
    public ApiResponse<List<TourResponse>> getAll() {
        return ApiResponse.<List<TourResponse>>builder()
                .result(tourService.getAllTours())
                .message("Got successfully")
                .build();
    }

    @PostMapping()
    public ApiResponse<TourResponse> createTour(@ModelAttribute TourRequest request) {
        return ApiResponse.<TourResponse>builder()
                .result(tourService.createTour(request))
                .message("Created successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<TourResponse> updateTour(@PathVariable int id,  @RequestBody TourRequest request) {
        return ApiResponse.<TourResponse>builder()
                .result(tourService.updateTour(id, request))
                .message("Updated successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteTour(@PathVariable int id) {
        tourService.deleteTour(id);
        return ApiResponse.<Void>builder()
                .message("Deleted successfully")
                .build();
    }



}
