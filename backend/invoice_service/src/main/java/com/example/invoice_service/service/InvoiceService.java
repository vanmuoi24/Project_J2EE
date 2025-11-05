package com.example.invoice_service.service;
import com.example.invoice_service.client.BookingClient;
import com.example.invoice_service.client.PaymentClient;
import com.example.invoice_service.client.TourDepartureClient;
import com.example.invoice_service.client.UserClient;
import com.example.invoice_service.dto.request.CustomerRequest;
import com.example.invoice_service.dto.request.InvoiceRequest;
import com.example.invoice_service.dto.request.TourDepartureRequest;
import com.example.invoice_service.dto.response.*;
import com.example.invoice_service.entity.Invoice;
import com.example.invoice_service.entity.InvoiceStatus;
import com.example.invoice_service.exception.AppException;
import com.example.invoice_service.exception.ErrorCode;
import com.example.invoice_service.mapper.InvoiceMapper;
import com.example.invoice_service.repository.InvoiceRepository;
import com.example.invoice_service.dto.request.MoMoRequest;
import com.example.invoice_service.dto.response.MoMoResponse;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    private final UserClient userClient;
    private final TourDepartureClient tourDepartureClient;
    private final BookingClient bookingClient;
    private final PaymentClient paymentClient;

    /**
     * -------------- GET METHODS -----------------
     */
    public List<InvoiceResponse> getAllInvoices(){
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoiceMapper.toInvoiceResponseList(invoices);
    }

    public InvoiceResponse getInvoiceById(Long id){
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException());
        return invoiceMapper.toInvoiceResponse(invoice);
    }

    public InvoiceResponse getInvoiceByBookingId(Long id){
        Invoice invoice = invoiceRepository.findByBookingId(id)
                .orElseThrow(() -> new RuntimeException());
        return invoiceMapper.toInvoiceResponse(invoice);
    }

    /**
     * -------------- POST METHODS -----------------
     */
    /**
     * 🔹 Hàm tính toán tổng chi phí tour dựa trên số lượng khách và bảng giá
     */
    private long calculateTotalTourExpense(InvoiceRequest invoiceRequest, TourDepartureResponse tourDeparture) {
        long countOfAdult = 0, countOfChildren = 0, countOfToddler = 0, countOfInfant = 0;

        for (CustomerRequest cusReq : invoiceRequest.getBookingRequest().getListOfCustomers()) {
            switch (cusReq.getBookingType().toUpperCase()) {
                case "ADULT" -> countOfAdult++;
                case "CHILD" -> countOfChildren++;
                case "TODDLER" -> countOfToddler++;
                case "INFANT" -> countOfInfant++;
            }
        }

        long adultPrice = new BigDecimal(tourDeparture.getTourPrice().getAdultPrice()).longValue();
        long childrenPrice = new BigDecimal(tourDeparture.getTourPrice().getChildPrice()).longValue();
        long toddlerPrice = new BigDecimal(tourDeparture.getTourPrice().getToddlerPrice()).longValue();
        long infantPrice = new BigDecimal(tourDeparture.getTourPrice().getInfantPrice()).longValue();

        long total = countOfAdult * adultPrice
                + countOfChildren * childrenPrice
                + countOfToddler * toddlerPrice
                + countOfInfant * infantPrice;

        System.err.println(total);
        return total;
    }

    private long longVal(Object val) {
        return new BigDecimal(String.valueOf(val)).longValue();
    }

    private void updateAvailableSeats(TourDepartureResponse tour, InvoiceRequest request) {
        int bookedSeats = request.getBookingRequest().getListOfCustomers().size();
        int available = Integer.parseInt(tour.getAvailableSeats());
        int remaining = available - bookedSeats;

        TourDepartureRequest updateReq = TourDepartureRequest.builder()
                .departureDate(tour.getDepartureDate())
                .returnDate(tour.getReturnDate())
                .tourId(tour.getTourId())
                .availableSeats(String.valueOf(remaining))
                .build();

        tourDepartureClient.updateTourDepartureAvalableSeats(Long.parseLong(tour.getId()), updateReq);
    }

    private InvoiceResponse buildInvoiceResponse(
            Invoice invoice, long total, String message) {
        return InvoiceResponse.builder()
                .id(String.valueOf(invoice.getId()))
                .accountId(String.valueOf(invoice.getAccountId()))
                .bookingId(String.valueOf(invoice.getBookingId()))
                .paymentMethodId(String.valueOf(invoice.getPaymentMethodId()))
                .dayOfPay(String.valueOf(invoice.getDayOfPay()))
                .status(invoice.getStatus().name())
                .totalBookingTourExpense(String.valueOf(total))
                .moMoResponse(createMomoQR())
                .message(message)
                .build();
    }

    /**
     * 🔹 Tạo hóa đơn (invoice)
     */
    public InvoiceResponse createInvoice(InvoiceRequest invoiceRequest) {
        try {
            // --- Lấy dữ liệu từ các service ---
            ApiResponse<UserResponse> getUserResponse = userClient.getUserById(Long.parseLong(invoiceRequest.getBookingRequest().getUserId()));
            ApiResponse<TourDepartureResponse> getTourDepatureResponse = tourDepartureClient.getTourDepartureById(Long.parseLong(invoiceRequest.getBookingRequest().getTourDepartureId()));
            ApiResponse<BookingResponse> getBookingResponse = bookingClient.getBookingById(Long.parseLong(invoiceRequest.getBookingRequest().getBookingId()));

            // --- KIỂM TRA DỮ LIỆU ---
            if (getUserResponse == null) throw new AppException(ErrorCode.USER_NOT_EXISTED);
            if (getTourDepatureResponse == null) throw new AppException(ErrorCode.TOUR_DEPARTURE_NOT_EXISTED);
            if (getBookingResponse == null) throw new AppException(ErrorCode.BOOKING_NOT_EXISTED);

//            System.err.println(getUserResponse);
//            System.err.println(getTourDepatureResponse);
//            System.err.println(getBookingResponse);

            // --- Tính tổng tiền ---
            long totalExpense = calculateTotalTourExpense(invoiceRequest, getTourDepatureResponse.getResult());

            // --- TẠO VÀ LƯU INVOICE ---
            Invoice invoice = invoiceMapper.toInvoice(invoiceRequest);
            invoice.setAccountId(Integer.parseInt(getUserResponse.getResult().getId()));
            invoice.setBookingId(Integer.parseInt(getBookingResponse.getResult().getId()));
            invoice.setStatus(InvoiceStatus.PAID);
            invoice.setDayOfPay(LocalDateTime.now());
            invoice.setPaymentMethodId(1);
            invoice.setTotalBookingTourExpense(totalExpense);
            invoiceRepository.save(invoice);

            updateAvailableSeats(getTourDepatureResponse.getResult(), invoiceRequest);

            List<CustomerRequest> listOfCustomerRequests = invoiceRequest.getBookingRequest().getListOfCustomers();
            // --- TRẢ VỀ RESPONSE ---
            return buildInvoiceResponse(invoice, totalExpense, "Hoá đơn được tạo thành công");
        }
        catch (FeignException.NotFound e) {
            throw new AppException(ErrorCode.RESOURCE_NOT_FOUND);
        }
        catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.DATA_INTEGRITY_ERROR);
        }
        catch (Exception e) {
            log.error("Lỗi khi tạo hóa đơn: {}", e.getMessage());
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    /**
     * 🔹 Hàm thanh toán MOMO
     */
    public MoMoResponse createMomoQR(){
        MoMoRequest momoRequest = MoMoRequest.builder()
                .amount(10000)
                .orderId("INV-" + UUID.randomUUID())
                .build();

        MoMoResponse momoResp;
        try {
            momoResp = paymentClient.createMoMoPayment(momoRequest).getResult();
            return momoResp;
        } catch (Exception ex) {
            log.error("MoMo payment failed: {}", ex.getMessage());
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    /**
     * 🔹 Thực hiện thanh toán và tạo hóa đơn
     */
    public InvoiceResponse payAndCreateInvoice(InvoiceRequest invoiceRequest) {
        log.info("🔸 Bắt đầu thanh toán MoMo cho booking ID {}", invoiceRequest.getBookingRequest().getBookingId());
        InvoiceResponse invoiceResponse = createInvoice(invoiceRequest);

        log.info("✅ Invoice created successfully for booking ID {}", invoiceRequest.getBookingRequest().getBookingId());
        return invoiceResponse;
    }



}