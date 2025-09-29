package com.example.invoice_service.dto.response;

import com.example.invoice_service.dto.response.TourPriceResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TourDepartureResponse {
    int id;
    String tourCode;
    LocalDateTime departureDate;
    LocalDateTime returnDate;
    Short availableSeats;
    int tourId;
    TourPriceResponse tourPrice;
}
