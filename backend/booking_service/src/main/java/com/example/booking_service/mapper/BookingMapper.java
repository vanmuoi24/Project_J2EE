package com.example.booking_service.mapper;

import com.example.booking_service.dto.request.request.BookingRequest;
import com.example.booking_service.dto.request.response.BookingResponse;
import com.example.booking_service.entity.Booking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    Booking toBooking(BookingRequest request);
    BookingResponse toBookingResponse(Booking booking);
    java.util.List<BookingResponse> toBookingResponseList(java.util.List<Booking> bookings);
}