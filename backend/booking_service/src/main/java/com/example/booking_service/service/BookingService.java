package com.example.booking_service.service;

import com.example.booking_service.client.TourDepartureClient;
import com.example.booking_service.client.UserClient;
import com.example.booking_service.dto.request.BookingRequest;
import com.example.booking_service.dto.response.ApiResponse;
import com.example.booking_service.dto.response.BookingResponse;
import com.example.booking_service.dto.response.TourDepartureResponse;
import com.example.booking_service.dto.response.UserResponse;
import com.example.booking_service.entity.*;
import com.example.booking_service.exception.AppException;
import com.example.booking_service.exception.ErrorCode;
import com.example.booking_service.mapper.BookingMapper;
import com.example.booking_service.mapper.CustomerMapper;
import com.example.booking_service.repository.BookingRepository;
import com.example.booking_service.repository.CustomerRepository;
import feign.FeignException;
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
    private final TourDepartureClient tourDepartureClient;
    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final BookingMapper bookingMapper;
    private final CustomerMapper customerMapper;

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
        System.err.println(bookingRequest);

        try {
            // --- GỌI CÁC SERVICE ---
            ApiResponse<UserResponse> userResponse = userClient.getUserById(
                    Long.parseLong(bookingRequest.getUserId()));

            ApiResponse<TourDepartureResponse> departureResponse = tourDepartureClient.getTourDepartureById(
                    Long.parseLong(bookingRequest.getTourDepartureId()));

            // --- KIỂM TRA DỮ LIỆU ---
            if (userResponse == null || userResponse.getResult() == null) {
                throw new IllegalArgumentException("User không tồn tại với ID: " + bookingRequest.getUserId());
            }

            if (departureResponse == null || departureResponse.getResult() == null) {
                throw new IllegalArgumentException("TourDeparture không tồn tại với ID: " + bookingRequest.getTourDepartureId());
            }

            // --- LẤY SỐ GHẾ CÒN LẠI ---
            int availableSeats = departureResponse.getResult().getAvailableSeats();
            int requestedSeats = bookingRequest.getListOfCustomers().size();

            if(availableSeats == 0){
                return BookingResponse.builder()
                        .message("Tour đã hết chỗ.")
                        .tourDepartureResponse(departureResponse.getResult())
                        .build();
            }

            if (requestedSeats > availableSeats) {
                return BookingResponse.builder()
                        .message("Tour chỉ còn lại: " + availableSeats)
                        .tourDepartureResponse(departureResponse.getResult())
                        .build();
            }

            // --- TẠO BOOKING ---
            Booking booking = bookingMapper.toBooking(bookingRequest);
            booking.setStatus(BookingStatus.CONFIRMED);
            booking.setAccountId(Integer.parseInt(bookingRequest.getUserId()));
            booking.setCreatedAt(LocalDateTime.now());
            booking.setTourDepartureId(Integer.parseInt(bookingRequest.getTourDepartureId()));

            // Lưu booking trước để có ID (nếu có quan hệ FK)
            bookingRepository.save(booking);

            // --- TẠO DANH SÁCH KHÁCH HÀNG ---
            List<Customer> customers = bookingRequest.getListOfCustomers().stream()
                    .map(cusReq -> {
                        LocalDate birthdate = LocalDate.parse(cusReq.getBirthdate());
                        int age = Period.between(birthdate, LocalDate.now()).getYears();
                        boolean genderValue = cusReq.getGender().equalsIgnoreCase("Male");

                        BookingType bookingType;
                        if (age < 2) {
                            bookingType = BookingType.INFANT;
                        } else if (age >= 2 && age <= 4) {
                            bookingType = BookingType.TODDLER;
                        } else if (age >= 5 && age <= 11) {
                            bookingType = BookingType.CHILD;
                        } else {
                            bookingType = BookingType.ADULT;
                        }

                        return Customer.builder()
                                .fullName(cusReq.getFullName())
                                .address(cusReq.getAddress())
                                .dateOfBirth(birthdate)
                                .status(CustomerStatus.BOOKED)
                                .gender(genderValue)
                                .bookingType(bookingType)
                                .booking(booking) // nếu Customer có quan hệ ManyToOne Booking
                                .build();
                    }).toList();


            // --- Lưu danh sách khách hàng --- //
            customerRepository.saveAll(customers);

            // --- TRẢ KẾT QUẢ ---
            return BookingResponse.builder()
                    .id(String.valueOf(booking.getId()))
                    .createdAt(String.valueOf(booking.getCreatedAt()))
                    .accountId(String.valueOf(booking.getAccountId()))
                    .listOfCustomers(customerMapper.toCustomerResponseList(customers))
                    .tourDepartureResponse(departureResponse.getResult())
                    .status(String.valueOf(booking.getStatus()))
                    .message(String.valueOf("Đặt tour thành công"))
                    .build();

        } catch (DataIntegrityViolationException exception) {
            throw new RuntimeException("Lỗi dữ liệu không hợp lệ trong DB", exception);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("ID không hợp lệ", e);
        } catch (FeignException.NotFound e) {
            throw new IllegalArgumentException("Không tìm thấy tài nguyên: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy dữ liệu người dùng hoặc tour", e);
        }
    }


}
