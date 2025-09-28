package com.example.invoice_service.dto.response;

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
public class InvoiceResponse {
    private String userId;
    private String dateOfTransaction;
    private String paymentMethodId;
    private String status;
    private String totalAdult;
    private String totalChildren;
    private String totalToddler;
    private String totalInfant;
    private String totalExtraFee;
    private String totalBooking;
    private String totalBookingTourExpense;
    private List<CustomerResponse> customerResponseList;
}
