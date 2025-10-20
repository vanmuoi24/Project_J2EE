package com.example.tour_service.dto.request;

import com.example.tour_service.dto.response.VehicleResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TourRequest {
    String tourProgram;
    String tourTitle;
    String description;
    int duration;
    int departureLocationId;
    int destinationLocationId;
    BigDecimal basePrice;
    String vehicleId;
    Long tourPriceId;
}