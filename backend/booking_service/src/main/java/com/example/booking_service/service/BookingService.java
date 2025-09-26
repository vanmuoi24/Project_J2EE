package com.example.booking_service.service;

import com.example.booking_service.dto.request.request.BookingRequest;
import com.example.booking_service.dto.request.response.ApiResponse;
import com.example.booking_service.dto.request.response.BookingResponse;
import com.example.booking_service.entity.Booking;
import com.example.booking_service.entity.BookingStatus;
import com.example.booking_service.exception.AppException;
import com.example.booking_service.exception.ErrorCode;
import com.example.booking_service.mapper.BookingMapper;
import com.example.booking_service.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.awt.print.Book;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String url = "http://localhost:8888/api/v1/auth/users/";
//    private final String getAllCustomerUrl =

    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookingMapper.toBookingResponseList(bookings);
    }

    public BookingResponse getBookingById(Long id){
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return bookingMapper.toBookingResponse(booking);
    }

    public ResponseEntity<String> getUserByIdUrl(Long id, String jwtToken){
        String customUrl = String.format(url + "%d", id);
        System.err.println(customUrl);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", jwtToken);  // đã gồm "Bearer ..."
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                customUrl,
                HttpMethod.GET,
                requestEntity,
                String.class
        );

        if (!responseEntity.getStatusCode().is2xxSuccessful() || responseEntity.getBody() == null) {
            throw new RuntimeException("USER ID IS UNEXISTED");
        }
        return responseEntity;
    }

    public BookingResponse createBooking(BookingRequest bookingRequest, String jwtToken){
        getUserByIdUrl(Long.parseLong(bookingRequest.getUserId()), jwtToken);

        Booking booking = bookingMapper.toBooking(bookingRequest);
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setAccountId(Integer.parseInt(bookingRequest.getUserId()));
        booking.setCreatedAt(LocalDateTime.now());
        booking.setTourDepartureId(Integer.parseInt(bookingRequest.getTourDepartureId()));

        try {
            bookingRepository.save(booking);
        } catch (DataIntegrityViolationException exception){
            throw new RuntimeException(exception);
        }

        return bookingMapper.toBookingResponse(booking);
    }

}
