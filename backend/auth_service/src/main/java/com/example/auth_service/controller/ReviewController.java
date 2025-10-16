package com.example.auth_service.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.auth_service.dto.request.ApiResponse;
import com.example.auth_service.dto.request.ReviewRequest;
import com.example.auth_service.dto.response.ReviewResponse;
import com.example.auth_service.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ApiResponse<ReviewResponse> create(@RequestBody ReviewRequest req) {
        return ApiResponse.<ReviewResponse>builder().result(reviewService.createReview(req)).build();
    }

    @GetMapping("/tour/{tourId}")
    public ApiResponse<List<ReviewResponse>> getByTour(@PathVariable Long tourId) {
        return ApiResponse.<List<ReviewResponse>>builder()
                .result(reviewService.getReviewsByTour(tourId))
                .build();
    }

}
