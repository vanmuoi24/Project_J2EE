package com.example.invoice_service.client;

import com.example.invoice_service.config.FeignAuthConfig;
import com.example.invoice_service.dto.request.MoMoRequest;
import com.example.invoice_service.dto.response.ApiResponse;
import com.example.invoice_service.dto.response.MoMoResponse;
import com.example.invoice_service.dto.response.TourPriceResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "payment-service",
        url = "http://localhost:8888/api/v1/payment",
        configuration = FeignAuthConfig.class
)

public interface PaymentClient {

    @PostMapping("/momo/create")
    ApiResponse<MoMoResponse> createMoMoPayment(@RequestBody MoMoRequest request);

}