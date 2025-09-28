package com.example.booking_service.controller;

import com.example.booking_service.dto.request.request.BookingRequest;
import com.example.booking_service.dto.request.request.CustomerRequest;
import com.example.booking_service.dto.request.response.ApiResponse;
import com.example.booking_service.dto.request.response.BookingResponse;
import com.example.booking_service.dto.request.response.CustomerResponse;
import com.example.booking_service.entity.Customer;
import com.example.booking_service.service.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/customer")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class CustomerController {
    private final CustomerService customerService;

    @GetMapping("/{id}")
    public ApiResponse<CustomerResponse> getBookingsById(@PathVariable Long id) {
        return ApiResponse.<CustomerResponse>builder()
                .result(customerService.getCustomerById(id))
                .message("Got successfully")
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<CustomerResponse>> getAllCustomers() {
        return ApiResponse.<List<CustomerResponse>>builder()
                .result(customerService.getAllCustomers())
                .message("Got successfully")
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<List<CustomerResponse>> createCustomers(
            @RequestBody List<CustomerRequest> request,
            @RequestHeader("Authorization") String authHeader){
        return ApiResponse.<List<CustomerResponse>>builder()
                .result(customerService.createCustomers(request))
                .message("Created successfully")
                .build();
    }
}
