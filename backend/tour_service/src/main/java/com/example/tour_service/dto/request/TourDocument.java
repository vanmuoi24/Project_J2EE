package com.example.tour_service.dto.request;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public class TourDocument {
    int id;
    String tourProgram;
    String tourTitle;
    BigDecimal basePrice;
    String departureLocation;
    String destinationLocation;
    String vehicle;
    List<String> departureDates;
}
