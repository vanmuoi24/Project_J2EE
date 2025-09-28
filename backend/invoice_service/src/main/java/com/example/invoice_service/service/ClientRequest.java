package com.example.invoice_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ClientRequest {
    private final String urlGetUserId = ServiceUrlConfig.REQUEST_AUTH_SERVICE;
    private final String urlGetTourDepartureId = ServiceUrlConfig.REQUEST_TOUR_DEPARTURE_URL;
    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> getUserExistedById(Long id, String jwtToken){
        String customUrl = String.format(urlGetUserId + "%d", id);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", jwtToken);  // đã gồm "Bearer ..."
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                customUrl,
                HttpMethod.GET,
                requestEntity,
                String.class
        );

        if (!responseEntity.getStatusCode().is2xxSuccessful() || responseEntity.getBody() == null) {
            throw new RuntimeException("USER ID IS UNEXISTED");
        }
        return responseEntity;
    }

    public ResponseEntity<String> getTourDepartureById(Long id, String jwtToken){
        String customUrl = String.format(urlGetTourDepartureId + "%d", id);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", jwtToken);  // đã gồm "Bearer ..."
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                customUrl,
                HttpMethod.GET,
                requestEntity,
                String.class
        );

        if (!responseEntity.getStatusCode().is2xxSuccessful() || responseEntity.getBody() == null) {
            throw new RuntimeException("USER ID IS UNEXISTED");
        }
        return responseEntity;
    }
}
