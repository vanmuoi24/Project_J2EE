package com.example.booking_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "customer_booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(CustomerBookingId.class)
public class CustomerBooking {
    @Id
    @Column(name = "customer_id")
    private int customerId;

    @Id
    @Column(name = "booking_id")
    private int bookingId;

    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "booking_id", insertable = false, updatable = false)
    private Booking booking;
}
