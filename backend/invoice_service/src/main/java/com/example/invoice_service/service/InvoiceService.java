package com.example.invoice_service.service;

import com.example.invoice_service.dto.request.CustomerRequest;
import com.example.invoice_service.dto.request.InvoiceRequest;
import com.example.invoice_service.dto.response.InvoiceResponse;
import com.example.invoice_service.entity.Invoice;
import com.example.invoice_service.entity.InvoiceStatus;
import com.example.invoice_service.entity.Method;
import com.example.invoice_service.mapper.InvoiceMapper;
import com.example.invoice_service.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    private final ClientRequest userService;

    public List<InvoiceResponse> getAllInvoices(){
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoiceMapper.toInvoiceResponseList(invoices);
    }

    public InvoiceResponse getInvoiceById(Long id){
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());
        return invoiceMapper.toInvoiceResponse(invoice);
    }

    public InvoiceResponse createInvoice(InvoiceRequest invoiceRequest, String jwtToken) {
        userService.getUserExistedById(Long.parseLong(invoiceRequest.getUserId()), jwtToken);
        System.err.println(invoiceRequest);

        int countOfAdult,
            countOfChildren,
            countOfTodler,
            countOfInfant;

//        List<CustomerRequest> listOfCustomersReq = invoiceRequest.getListOfCustomers();
//        listOfCustomersReq.stream().map(customerRequest -> {
//
//            return
//        }).toList();

        Invoice invoice = invoiceMapper.toInvoice(invoiceRequest);
        invoice.setAccountId(Integer.parseInt(invoiceRequest.getUserId()));
        invoice.setStatus(InvoiceStatus.PAID);
        invoice.setDayOfPay(LocalDateTime.parse(invoiceRequest.getDateOfTransaction()));
        invoice.setPaymentMethorId(Integer.parseInt(invoiceRequest.getPaymentMethodId()));
        invoice.setTotalBookingTourExpense(Integer.parseInt(invoiceRequest.getTotalBookingTourExpense()));

        try {
            invoiceRepository.save(invoice);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException(e);
        }
        return invoiceMapper.toInvoiceResponse(invoice);
    }

}
