package com.example.invoice_service.mapper;

import com.example.invoice_service.dto.request.InvoiceRequest;
import com.example.invoice_service.dto.response.InvoiceResponse;
import com.example.invoice_service.entity.Invoice;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")

public interface InvoiceMapper {
    Invoice toInvoice(InvoiceRequest request);
    InvoiceResponse toInvoiceResponse(Invoice invoice);
    java.util.List<InvoiceResponse> toInvoiceResponseList(java.util.List<Invoice> invoices);
}
