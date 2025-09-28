package com.example.booking_service.entity;

import jakarta.persistence.*;
import jakarta.validation.OverridesAttribute;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "birthdate", length = 20, nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "gender", nullable = true)
    private Boolean gender;

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "booking_type", nullable = false)
    private BookingType bookingType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CustomerStatus status;

    @OneToMany(mappedBy = "customer")
    private Set<CustomerBooking> customerBookings = new HashSet<CustomerBooking>();
}
