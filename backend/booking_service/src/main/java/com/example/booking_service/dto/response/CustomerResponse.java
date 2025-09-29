package com.example.booking_service.dto.response;

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
    private String id;
    private String fullName;
    private String birthdate;
    private String address;
    private String bookingType;
    private String gender;
    private String status;
}
