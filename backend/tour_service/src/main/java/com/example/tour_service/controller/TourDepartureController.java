package com.example.tour_service.controller;
<<<<<<< HEAD

import com.example.tour_service.dto.response.ApiResponse;
import com.example.tour_service.dto.request.TourDepartureRequest;
import com.example.tour_service.dto.response.ItineraryResponse;
=======
import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.request.TourDepartureRequest;
import com.example.tour_service.dto.response.ItineraryResponse;
import com.example.tour_service.dto.request.TourRequest;
>>>>>>> d3fdc808e040ae78e1954bf50f62a626bcf5237c
import com.example.tour_service.dto.response.TourDepartureResponse;
import com.example.tour_service.service.TourDepartureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tour-departures")
@RequiredArgsConstructor
public class TourDepartureController {
    private final TourDepartureService tourDepartureService;

    @GetMapping("/{id}")
    public ApiResponse<TourDepartureResponse> getTourDepartureById(@PathVariable int id) {
        return ApiResponse.<TourDepartureResponse>builder()
                .result(tourDepartureService.getTourDepartureById(id))
                .message("Got Successfully")
                .build();
    }

    @GetMapping("/list")
    public ApiResponse<List<TourDepartureResponse>> getAll() {
        return ApiResponse.<List<TourDepartureResponse>>builder()
                .result(tourDepartureService.getAllTourDeparture())
                .message("Fetched successfully")
                .build();
    }

    @GetMapping("/tour/{tourId}")
    public ApiResponse<List<TourDepartureResponse>> getByTourId(@PathVariable int tourId) {
        return ApiResponse.<List<TourDepartureResponse>>builder()
                .result(tourDepartureService.getTourDepartureByTourId(tourId))
                .message("Fetched successfully")
                .build();
    }

    @PostMapping
    public ApiResponse<TourDepartureResponse> createTourDeparture(@RequestBody TourDepartureRequest request) {
        return ApiResponse.<TourDepartureResponse>builder()
                .result(tourDepartureService.create(request))
                .message("Created Successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<TourDepartureResponse> updateTourDeparture(@PathVariable int id, @RequestBody TourDepartureRequest request) {
        return ApiResponse.<TourDepartureResponse>builder()
                .result(tourDepartureService.update(id, request))
                .message("Updated successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteTourDeparture(@PathVariable int id) {
        tourDepartureService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Deleted successfully")
                .build();
    }

}
