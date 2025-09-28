package com.example.invoice_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceRequest {
    private String userId;
    private String dateOfTransaction;
    private String paymentMethodId;
    private String status;
    private String totalBookingTourExpense;
    private List<CustomerRequest> listOfCustomers;
}
