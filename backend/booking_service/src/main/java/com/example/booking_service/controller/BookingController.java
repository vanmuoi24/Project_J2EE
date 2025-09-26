package com.example.booking_service.controller;

import com.example.booking_service.dto.request.request.BookingRequest;
import com.example.booking_service.dto.request.response.ApiResponse;
import com.example.booking_service.dto.request.response.BookingResponse;
import com.example.booking_service.service.BookingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class BookingController {
    private final BookingService bookingService;

    @GetMapping("/{id}")
    public ApiResponse<BookingResponse> getBookingsById(@PathVariable Long id) {
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.getBookingById(id))
                .message("Got successfully")
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<BookingResponse>> getAllBookings() {
        return ApiResponse.<List<BookingResponse>>builder()
                .result(bookingService.getAllBookings())
                .message("Got successfully")
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<BookingResponse> createBooking(
            @RequestBody BookingRequest request,
            @RequestHeader("Authorization") String authHeader){
//        System.err.println(request);
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.createBooking(request, authHeader))
                .message("Created successfully")
                .build();
    }

}
