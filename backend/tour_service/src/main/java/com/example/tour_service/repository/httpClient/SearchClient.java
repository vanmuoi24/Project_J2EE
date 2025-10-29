package com.example.tour_service.repository.httpClient;


import com.example.tour_service.config.FeignAuthConfig;
import com.example.tour_service.dto.request.TourDocument;
import com.example.tour_service.entity.Tour;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "search-service",
        url = "http://localhost:8888/api/v1/search",
        configuration = FeignAuthConfig.class
)
public interface SearchClient {
    @PostMapping("/tours")
    void saveTour(@RequestBody TourDocument tour);
}
