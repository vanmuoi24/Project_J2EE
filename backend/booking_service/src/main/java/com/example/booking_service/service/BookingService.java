package com.example.booking_service.service;

import com.example.booking_service.client.UserClient;
import com.example.booking_service.dto.request.BookingRequest;
import com.example.booking_service.dto.response.BookingResponse;
import com.example.booking_service.entity.*;
import com.example.booking_service.exception.AppException;
import com.example.booking_service.exception.ErrorCode;
import com.example.booking_service.mapper.BookingMapper;
import com.example.booking_service.repository.BookingRepository;
import com.example.booking_service.repository.CustomerBookingRepository;
import com.example.booking_service.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final UserClient userClient;
    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final CustomerBookingRepository customerBookingRepository;
    private final BookingMapper bookingMapper;

    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookingMapper.toBookingResponseList(bookings);
    }

    public BookingResponse getBookingById(Long id){
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return bookingMapper.toBookingResponse(booking);
    }

    public BookingResponse createBooking(BookingRequest bookingRequest) {
        userClient.getUserById(Long.parseLong(bookingRequest.getUserId()));
        System.err.println(bookingRequest);

        Booking booking = bookingMapper.toBooking(bookingRequest);
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setAccountId(Integer.parseInt(bookingRequest.getUserId()));
        booking.setCreatedAt(LocalDateTime.now());
        booking.setTourDepartureId(Integer.parseInt(bookingRequest.getTourDepartureId()));

        List<Customer> customers;
        try {
            customers = bookingRequest.getListOfCustomers().stream()
                    .map(cusReq -> {
                        LocalDate birthdate = LocalDate.parse(cusReq.getBirthdate());
                        int age = Period.between(birthdate, LocalDate.now()).getYears();
                        boolean genderValue = cusReq.getGender().equalsIgnoreCase("Male") ? true : false;
                        BookingType bookingType = BookingType.ADULT;

                        if(age < 2){
                            bookingType = BookingType.INFANT;
                        }
                        if(age >= 2 && age <= 4){
                            bookingType = BookingType.TODDLER;
                        }
                        if(age >= 5 && age >= 11){
                            bookingType = BookingType.CHILDREN;
                        }
                        if(age >= 12){
                            bookingType = BookingType.ADULT;
                        }

                        return Customer.builder()
                                .fullName(cusReq.getFullName())
                                .address(cusReq.getAddress())
                                .dateOfBirth(birthdate)
                                .status(CustomerStatus.BOOKED)
                                .gender(genderValue)
                                .bookingType(bookingType)
                                .build();
                    }).toList();

            customerRepository.saveAll(customers);
            bookingRepository.save(booking);
        } catch (DataIntegrityViolationException exception) {
            throw new RuntimeException(exception);
        }
        return bookingMapper.toBookingResponse(booking, customers);
    }

}
