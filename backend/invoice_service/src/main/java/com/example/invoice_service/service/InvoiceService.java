package com.example.invoice_service.service;

import com.example.invoice_service.dto.request.InvoiceRequest;
import com.example.invoice_service.dto.response.InvoiceResponse;
import com.example.invoice_service.entity.Invoice;
import com.example.invoice_service.mapper.InvoiceMapper;
import com.example.invoice_service.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;

    public List<InvoiceResponse> getAllInvoices(){
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoiceMapper.toInvoiceResponseList(invoices);
    }

    public InvoiceResponse getInvoiceById(Long id){
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());
        return invoiceMapper.toInvoiceResponse(invoice);
    }

    public InvoiceResponse createInvoice(InvoiceRequest invoiceRequest){
        Invoice invoice = invoiceMapper.toInvoice(invoiceRequest);
        try {
            invoiceRepository.save(invoice);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException(e);
        }
        return invoiceMapper.toInvoiceResponse(invoice);
    }

}
