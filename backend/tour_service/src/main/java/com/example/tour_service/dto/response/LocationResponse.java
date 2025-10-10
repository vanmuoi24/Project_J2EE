package com.example.tour_service.dto.response;

import com.example.tour_service.enums.LocationType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE) 

public class LocationResponse {
    String city;
    private LocationType type; 
}
