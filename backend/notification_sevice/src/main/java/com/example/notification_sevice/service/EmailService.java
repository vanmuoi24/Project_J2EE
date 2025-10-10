package com.example.notification_sevice.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.notification_sevice.dto.reponse.EmailResponse;
import com.example.notification_sevice.dto.request.EmailRequest;
import com.example.notification_sevice.dto.request.SendEmailRequest;
import com.example.notification_sevice.dto.request.Sender;
import com.example.notification_sevice.exception.AppException;
import com.example.notification_sevice.exception.ErrorCode;
import com.example.notification_sevice.repository.httpClient.EmailClient;

import feign.FeignException;
import lombok.experimental.NonFinal;


@Service
public class EmailService {
    

    EmailClient emailClient;
    @Value("${notification.email.brevo-apikey}")
    @NonFinal
    String apiKey;

    public EmailResponse sendEmail(SendEmailRequest request) {
        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("TenTour")
                        .email("domuoigghh@gmail.com")
                        .build())
                .to(List.of(request.getTo()))
                .subject(request.getSubject())
                .htmlContent(request.getHtmlContent())
                .build();
        try {
            return emailClient.sendEmail(apiKey, emailRequest);
        } catch (FeignException e){
            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }
}
