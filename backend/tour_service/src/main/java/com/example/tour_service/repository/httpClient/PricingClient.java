package com.example.tour_service.repository.httpClient;

import com.example.tour_service.config.FeignAuthConfig;
import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.response.TourPriceResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "pricing-service",
        url = "http://localhost:8888/api/v1/pricing",
        configuration = FeignAuthConfig.class
)
public interface PricingClient {
    @GetMapping("/prices/{id}")
    ApiResponse<TourPriceResponse> getPriceById(@PathVariable("id") Long id);
}