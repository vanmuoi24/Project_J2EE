package com.example.tour_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TourResponse {
    int id;
    String tourProgram;
    String tourTitle;
    String description;
    int duration;
    LocationResponse departureCity;
    LocationResponse destinationCity;
    BigDecimal basePrice;
    VehicleResponse vehicle;
    TourPriceResponse tourPrice;
}