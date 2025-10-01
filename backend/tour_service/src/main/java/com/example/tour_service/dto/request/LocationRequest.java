package com.example.tour_service.dto.request;

import com.example.tour_service.enums.LocationType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LocationRequest {
    String city;
    LocationType type;
}
