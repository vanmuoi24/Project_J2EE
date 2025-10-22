package com.example.booking_service.repository;

import com.example.booking_service.entity.CustomerBooking;
import com.example.booking_service.entity.CustomerBookingId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerBookingRepository extends JpaRepository<CustomerBooking, CustomerBookingId> {
}
