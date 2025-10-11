package com.example.invoice_service.service;
import com.example.invoice_service.client.BookingClient;
import com.example.invoice_service.client.PricingClient;
import com.example.invoice_service.client.TourDepartureClient;
import com.example.invoice_service.client.UserClient;
import com.example.invoice_service.dto.request.BookingRequest;
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
import feign.FeignException;
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
    private final UserClient userClient;
    private final TourDepartureClient tourDepartureClient;
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

        try {
            // --- GỌI CÁC SERVICE ---
            ApiResponse<UserResponse> getUserResponse = userClient.getUserById(
                    Long.parseLong(invoiceRequest.getBookingRequest().getUserId()));

            ApiResponse<TourDepartureResponse> getTourDepatureResponse = tourDepartureClient.getTourDepartureById(
                    Long.parseLong(invoiceRequest.getBookingRequest().getTourDepartureId()));

            ApiResponse<BookingResponse> getBookingResponse = bookingClient.getBookingById(
                    Long.parseLong(invoiceRequest.getBookingRequest().getBookingId()));

            // --- KIỂM TRA DỮ LIỆU ---
            if (getUserResponse == null) {
                throw new AppException(ErrorCode.USER_NOT_EXISTED);
            }
            if (getTourDepatureResponse == null) {
                throw new AppException(ErrorCode.TOUR_DEPARTURE_NOT_EXISTED);
            }
            if (getBookingResponse == null) {
                throw new AppException(ErrorCode.BOOKING_NOT_EXISTED);
            }

            System.err.println(getUserResponse);
            System.err.println(getTourDepatureResponse);
            System.err.println(getBookingResponse);

            String getUserId = getUserResponse.getResult().getId();
            String getTourDepartureId = getTourDepatureResponse.getResult().getId();
            String getBookingId = getBookingResponse.getResult().getId();
            String getAvalableSeat = getTourDepatureResponse.getResult().getAvailableSeats();

            // --- TÍNH TOÁN SỐ LƯỢNG KHÁCH ---
            int countOfAdult = 0;
            int countOfChildren = 0;
            int countOfToddler = 0;
            int countOfInfant = 0;

            for (CustomerRequest cusReq : invoiceRequest.getBookingRequest().getListOfCustomers()) {
                switch (cusReq.getBookingType().toUpperCase()) {
                    case "ADULT" -> countOfAdult++;
                    case "CHILD" -> countOfChildren++;
                    case "TODDLER" -> countOfToddler++;
                    case "INFANT" -> countOfInfant++;
                }
            }

            int totalCountOfBooking = countOfAdult + countOfChildren + countOfToddler + countOfInfant;

            // --- TÍNH GIÁ TOUR ---
            Float adultPrice = Float.parseFloat(getTourDepatureResponse.getResult().getTourPrice().getAdultPrice());
            Float childrenPrice = Float.parseFloat(getTourDepatureResponse.getResult().getTourPrice().getChildPrice());
            Float toddlerPrice = Float.parseFloat(getTourDepatureResponse.getResult().getTourPrice().getToddlerPrice());
            Float infantPrice = Float.parseFloat(getTourDepatureResponse.getResult().getTourPrice().getInfantPrice());

            Float totalPriceOfAdult = countOfAdult * adultPrice;
            Float totalPriceOfChildren = countOfChildren * childrenPrice;
            Float totalPriceOfToddler = countOfToddler * toddlerPrice;
            Float totalPriceOfInfant = countOfInfant * infantPrice;
            Float totalTourDepartureExpense = totalPriceOfAdult + totalPriceOfChildren + totalPriceOfToddler + totalPriceOfInfant;

            // --- TẠO VÀ LƯU INVOICE ---
            Invoice invoice = invoiceMapper.toInvoice(invoiceRequest);
            invoice.setAccountId(Integer.parseInt(getUserId));
            invoice.setStatus(InvoiceStatus.PAID);
            invoice.setDayOfPay(LocalDateTime.now());
            invoice.setPaymentMethorId(1);
            invoice.setTotalBookingTourExpense(totalTourDepartureExpense);
            invoice.setBookingId(Integer.parseInt(getBookingId));

            invoiceRepository.save(invoice);

            // --- GIẢM SỐ GHẾ CÒN LẠI ---
            int requestedSeats = invoiceRequest.getBookingRequest().getListOfCustomers().size();
            int avalableSeat = Integer.parseInt(getAvalableSeat);
            int theRestOfAvalaibleSeats = avalableSeat - requestedSeats;

            TourDepartureRequest updateTourDepartureReq = new TourDepartureRequest();
            updateTourDepartureReq.setDepartureDate(getTourDepatureResponse.getResult().getDepartureDate());
            updateTourDepartureReq.setReturnDate(getTourDepatureResponse.getResult().getReturnDate());
            updateTourDepartureReq.setTourId(getTourDepatureResponse.getResult().getTourId());
            updateTourDepartureReq.setAvailableSeats(String.valueOf(theRestOfAvalaibleSeats));
            System.err.println(updateTourDepartureReq);

            tourDepartureClient.updateTourDepartureAvalableSeats(
                    Long.parseLong(getTourDepartureId),
                    updateTourDepartureReq);

            // --- TRẢ VỀ RESPONSE ---
            return InvoiceResponse.builder()
                    .userId(String.valueOf(invoice.getAccountId()))
                    .bookingId(getBookingResponse.getResult().getId())
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
                    .message(String.valueOf("Thanh toán thành công, hóa đơn đã được tạo."))
                    .build();

        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("ID không hợp lệ", e);
        } catch (FeignException.NotFound e) {
            throw new IllegalArgumentException("Không tìm thấy tài nguyên: " + e.getMessage(), e);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Lỗi khi lưu dữ liệu invoice", e);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy dữ liệu người dùng hoặc tour", e);
        }
    }
}
