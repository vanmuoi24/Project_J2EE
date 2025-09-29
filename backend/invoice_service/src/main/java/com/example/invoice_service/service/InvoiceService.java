package com.example.invoice_service.service;

import com.example.invoice_service.client.PricingClient;
import com.example.invoice_service.client.TourDepartureClient;
import com.example.invoice_service.client.UserClient;
import com.example.invoice_service.dto.request.BookingRequest;
import com.example.invoice_service.dto.request.CustomerRequest;
import com.example.invoice_service.dto.request.InvoiceRequest;
import com.example.invoice_service.dto.response.*;
import com.example.invoice_service.entity.Invoice;
import com.example.invoice_service.entity.InvoiceStatus;
import com.example.invoice_service.exception.AppException;
import com.example.invoice_service.exception.ErrorCode;
import com.example.invoice_service.mapper.InvoiceMapper;
import com.example.invoice_service.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    private final UserClient userService;
    private final PricingClient priceService;
    private final TourDepartureClient tourDepartureService;

    public List<InvoiceResponse> getAllInvoices(){
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoiceMapper.toInvoiceResponseList(invoices);
    }

    public InvoiceResponse getInvoiceById(Long id){
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());
        return invoiceMapper.toInvoiceResponse(invoice);
    }

    public InvoiceResponse createInvoice(InvoiceRequest invoiceRequest) {
        System.err.println(invoiceRequest);
        ApiResponse<UserResponse> getUserApi = userService.getUserById(Long.parseLong(
                invoiceRequest.getBookingRequest().getUserId()));

        ApiResponse<TourDepartureResponse> getTourDepatureApi = tourDepartureService.getTourDepartureById(Long.parseLong(
                invoiceRequest.getBookingRequest().getTourDepartureId()));

        ApiResponse<TourPriceResponse> getTourPriceResponseApi = priceService.getPriceById(Long.parseLong(
                invoiceRequest.getBookingRequest().getPriceId()));

        if(getUserApi == null) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        if(getTourDepatureApi == null) {
            throw new AppException(ErrorCode.TOUR_DEPARTURE_NOT_EXISTED);
        }
        if(getTourPriceResponseApi == null) {
            throw new AppException(ErrorCode.PRICE_NOT_EXISTED);
        }

        int countOfAdult = 0;
        int countOfChildren = 0;
        int countOfTodler = 0;
        int countOfInfant = 0;

        int theRestOfSeat = Integer.parseInt(invoiceRequest.getBookingRequest().getAvailableSeats());
        int totalCountOfBooking = countOfAdult + countOfChildren + countOfTodler + countOfInfant;
        if (totalCountOfBooking > theRestOfSeat) {
            throw new RuntimeException("Sold out: Not enough seats available!");
        }

        for (CustomerRequest cusReq : invoiceRequest.getBookingRequest().getListOfCustomers()) {
            switch (cusReq.getBookingType().toUpperCase()) {
                case "ADULT" -> countOfAdult++;
                case "CHILDREN" -> countOfChildren++;
                case "TODLER" -> countOfTodler++;
                case "INFANT" -> countOfInfant++;
            }
        }

        Float adultPrice = Float.parseFloat(getTourPriceResponseApi.getResult().getAdultPrice());
        Float childrenPrice = Float.parseFloat(getTourPriceResponseApi.getResult().getChildPrice());
        Float todlerPrice = Float.parseFloat(getTourPriceResponseApi.getResult().getToddlerPrice());
        Float infantPrice = Float.parseFloat(getTourPriceResponseApi.getResult().getInfantPrice());

        Float totalPriceOfAdult = countOfAdult * adultPrice;
        Float totalPriceOfChildren = countOfChildren * childrenPrice;
        Float totalPriceOfTodler = countOfTodler * todlerPrice;
        Float totalPriceOfInfant = countOfInfant * infantPrice;
        Float totalTourDepartureExpense = totalPriceOfAdult + totalPriceOfChildren + totalPriceOfTodler + totalPriceOfInfant;

        Invoice invoice = invoiceMapper.toInvoice(invoiceRequest);
        invoice.setAccountId(Integer.parseInt(invoiceRequest.getBookingRequest().getUserId()));
        invoice.setStatus(InvoiceStatus.PAID);
        invoice.setDayOfPay(LocalDateTime.now());
        invoice.setPaymentMethorId(1);
        invoice.setTotalBookingTourExpense(totalTourDepartureExpense);

        try {
            invoiceRepository.save(invoice);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException(e);
        }
        return invoiceMapper.toInvoiceResponse(invoice);
    }

}
