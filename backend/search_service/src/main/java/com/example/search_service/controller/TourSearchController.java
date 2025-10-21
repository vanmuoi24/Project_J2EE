package com.example.search_service.controller;

import com.example.search_service.document.TourDocument;
import com.example.search_service.dto.ApiResponse;
import com.example.search_service.service.TourSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tours")
@RequiredArgsConstructor
public class TourSearchController {
    private final TourSearchService service;

    @PostMapping
    public ApiResponse<TourDocument> save(@RequestBody TourDocument doc) {
        return ApiResponse.<TourDocument>builder()
                .result(service.save(doc))
                .message("Save successfully")
                .build();
    }

    @GetMapping
    public ApiResponse<Iterable<TourDocument>> getAll() {
        return ApiResponse.<Iterable<TourDocument>>builder()
                .result(service.findAll())
                .message("Get successfully")
                .build();
    }

    

    @GetMapping("/search")
    public ApiResponse<List<TourDocument>> filterTours(
            @RequestParam String destinationLocation,
            @RequestParam String basePrice,
            @RequestParam String departureLocation
    ) {
        List<TourDocument> result = service.filterByDestinationAndPriceAndDate(destinationLocation, basePrice, departureLocation);
        return ApiResponse.<List<TourDocument>>builder()
                .message("Filter successfully")
                .result(result)
                .build();
    }
}
