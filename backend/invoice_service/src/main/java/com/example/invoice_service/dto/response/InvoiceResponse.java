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
//@JsonInclude(JsonInclude.Include.NON_NUL)
public class InvoiceResponse {
    private String id;
    private String accountId;
    private String bookingId;
    private String dayOfPay;
    private String paymentMethodId;
    private String status;
    private String message;
    private String totalExtraFee;
    private String totalBookingTourExpense;
    private MoMoResponse moMoResponse;
}
