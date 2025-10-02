package com.example.invoice_service.service;

import com.example.invoice_service.client.BookingClient;
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
    private final TourDepartureClient tourDepartureService;
    private final BookingClient bookingClient;

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
        ApiResponse<UserResponse> getUserResponse = userService.getUserById(Long.parseLong(
                invoiceRequest.getBookingRequest().getUserId()));

        ApiResponse<TourDepartureResponse> getTourDepatureResponse = tourDepartureService.getTourDepartureById(Long.parseLong(
                invoiceRequest.getBookingRequest().getTourDepartureId()));

        String getBookingId = bookingClient.getBookingById(Long.parseLong(
                invoiceRequest.getBookingRequest().getBookingId()));

        if(getUserResponse == null) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        if(getTourDepatureResponse == null) {
            throw new AppException(ErrorCode.TOUR_DEPARTURE_NOT_EXISTED);
        }

        if(getBookingId == null){
            throw new AppException(ErrorCode.BOOKING_NOT_EXISTED);
        }

        System.err.println(getUserResponse);
        System.err.println(getTourDepatureResponse);
        System.err.println(getBookingId);

        int countOfAdult = 0;
        int countOfChildren = 0;
        int countOfToddler = 0;
        int countOfInfant = 0;

        int theRestOfSeat = Integer.parseInt(getTourDepatureResponse.getResult().getAvailableSeats().toString());
        int totalCountOfBooking = countOfAdult + countOfChildren + countOfToddler + countOfInfant;
        if (totalCountOfBooking > theRestOfSeat) {
            throw new RuntimeException("Sold out: Not enough seats available!");
        }

        for (CustomerRequest cusReq : invoiceRequest.getBookingRequest().getListOfCustomers()) {
            switch (cusReq.getBookingType().toUpperCase()) {
                case "ADULT" -> countOfAdult++;
                case "CHILDREN" -> countOfChildren++;
                case "TODDLER" -> countOfToddler++;
                case "INFANT" -> countOfInfant++;
            }
        }

        Float adultPrice = Float.parseFloat(getTourDepatureResponse.getResult().getTourPrice().getAdultPrice());
        Float childrenPrice = Float.parseFloat(getTourDepatureResponse.getResult().getTourPrice().getChildPrice());
        Float toddlerPrice = Float.parseFloat(getTourDepatureResponse.getResult().getTourPrice().getToddlerPrice());
        Float infantPrice = Float.parseFloat(getTourDepatureResponse.getResult().getTourPrice().getInfantPrice());

        Float totalPriceOfAdult = countOfAdult * adultPrice;
        Float totalPriceOfChildren = countOfChildren * childrenPrice;
        Float totalPriceOfToddler = countOfToddler * toddlerPrice;
        Float totalPriceOfInfant = countOfInfant * infantPrice;
        Float totalTourDepartureExpense = totalPriceOfAdult + totalPriceOfChildren + totalPriceOfToddler + totalPriceOfInfant;

        Invoice invoice = invoiceMapper.toInvoice(invoiceRequest);
        invoice.setAccountId(Integer.parseInt(getUserResponse.getResult().getId()));
        invoice.setStatus(InvoiceStatus.PAID);
        invoice.setDayOfPay(LocalDateTime.now());
        invoice.setPaymentMethorId(1);
        invoice.setTotalBookingTourExpense(totalTourDepartureExpense);
        invoice.setBookingId(Integer.parseInt(invoiceRequest.getBookingRequest().getBookingId()));

        try {
            invoiceRepository.save(invoice);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException(e);
        }

        return InvoiceResponse.builder()
                .userId(String.valueOf(invoice.getAccountId()))
                .bookingId(getBookingId)
                .status(invoice.getStatus().toString())
                .dateOfTransaction(invoice.getDayOfPay().toString())
                .paymentMethodId(String.valueOf(invoice.getPaymentMethorId()))
                .totalCountOfAdult(String.valueOf(countOfAdult))
                .totalCountOfChildren(String.valueOf(countOfChildren))
                .totalCountOfToddler(String.valueOf(countOfToddler))
                .totalCountOfInfant(String.valueOf(countOfInfant))
                .totalChargeOfAdult(String.valueOf(totalPriceOfAdult))
                .totalChargeOfChildren(String.valueOf(totalPriceOfChildren))
                .totalChargeOfToddler(String.valueOf(totalPriceOfToddler))
                .totalChargeOfInfant(String.valueOf(totalPriceOfInfant))
                .totalBookingTourExpense(String.valueOf(totalTourDepartureExpense))
                .build();
    }
}
