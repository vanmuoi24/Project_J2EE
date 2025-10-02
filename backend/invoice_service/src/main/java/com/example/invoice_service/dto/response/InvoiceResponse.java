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
    private String bookingId;
    private String dateOfTransaction;
    private String paymentMethodId;
    private String status;
    private String totalCountOfAdult;
    private String totalCountOfChildren;
    private String totalCountOfToddler;
    private String totalCountOfInfant;
    private String totalChargeOfAdult;
    private String totalChargeOfChildren;
    private String totalChargeOfToddler;
    private String totalChargeOfInfant;
    private String totalExtraFee;
    private String totalBookingTourExpense;
    private List<CustomerResponse> customerResponseList;
}
