package com.example.booking_service.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingResponse {
    private String id;
    private String accountId;
    private String tourDepartureId;
    private String createdAt;
    private String status;
    private String message;
    private List<CustomerResponse> listOfCustomers;
    private TourDepartureResponse tourDepartureResponse;
}
