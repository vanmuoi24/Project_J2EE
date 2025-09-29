package com.example.booking_service.controller;

import com.example.booking_service.dto.request.BookingRequest;
import com.example.booking_service.dto.response.ApiResponse;
import com.example.booking_service.dto.response.BookingResponse;
import com.example.booking_service.service.BookingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

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
            @RequestBody BookingRequest request) {
                return ApiResponse.<BookingResponse>builder()
                .result(bookingService.createBooking(request))
                .message("Created successfully")
                .build();
    }

}
