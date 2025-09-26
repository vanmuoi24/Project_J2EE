package com.example.invoice_service.controller;

import com.example.invoice_service.dto.request.InvoiceRequest;
import com.example.invoice_service.dto.response.ApiResponse;
import com.example.invoice_service.dto.response.InvoiceResponse;
import com.example.invoice_service.service.InvoiceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoice")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class InvoiceController {
    private final InvoiceService invoiceService;
    
    @GetMapping("/{id}")
    public ApiResponse<InvoiceResponse> getBookingsById(@PathVariable Long id) {
        return ApiResponse.<InvoiceResponse>builder()
                .result(invoiceService.getInvoiceById(id))
                .message("Got successfully")
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<InvoiceResponse>> getAllBookings() {
        return ApiResponse.<List<InvoiceResponse>>builder()
                .result(invoiceService.getAllInvoices())
                .message("Got successfully")
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<InvoiceResponse> createBooking(@RequestBody InvoiceRequest request) {
//        System.err.println(request);
        return ApiResponse.<InvoiceResponse>builder()
                .result(invoiceService.createInvoice(request))
                .message("Created successfully")
                .build();
    }
}
