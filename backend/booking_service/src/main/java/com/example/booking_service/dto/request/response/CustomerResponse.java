package com.example.booking_service.dto.request.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)

public class CustomerResponse {
    String id;
    String fullName;
    String birthdate;
    String address;
    String bookingType;
    String gender;
    String status;
}
