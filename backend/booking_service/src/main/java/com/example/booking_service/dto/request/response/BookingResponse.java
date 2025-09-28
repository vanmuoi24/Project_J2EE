package com.example.booking_service.dto.request.response;

import com.example.booking_service.dto.request.request.CustomerRequest;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
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
    private String createAt;
    private String status;
    private List<CustomerRequest> listOfCustomers;
}
