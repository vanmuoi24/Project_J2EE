package com.example.invoice_service.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Primary;

import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "account_id", nullable = false)
    private int accountId;

    @Column(name = "day_of_pay", nullable = false)
    private LocalDateTime dayOfPay;

    @Column(name = "pay_method_id", nullable = false)
    private int paymentMethorId;

    @Column(name = "status", nullable = false)
    private InvoiceStatus status;

    @PrePersist
    protected void onDateOfPayment() {
        if (this.dayOfPay == null) {
            this.dayOfPay = LocalDateTime.now();
        }
    }

    @PrePersist
    protected void onStatus() {
        if (this.status == null) {
            this.status = InvoiceStatus.WAITING;
        }
    }
}
