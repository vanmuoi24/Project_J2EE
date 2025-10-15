package com.example.tour_service.dto.response;

<<<<<<< HEAD
import com.example.tour_service.enums.LocationType;

=======
>>>>>>> 36b0d30dd64d1d5fd9385dabe168388c1f72f378
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE) 

public class LocationResponse {
    String city;
<<<<<<< HEAD
    private LocationType type; 
=======
>>>>>>> 36b0d30dd64d1d5fd9385dabe168388c1f72f378
}
