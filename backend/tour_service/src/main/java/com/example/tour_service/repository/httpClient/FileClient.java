package com.example.tour_service.repository.httpClient;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.example.tour_service.config.AuthenticationRequestInterceptor;
import com.example.tour_service.dto.response.TourFileResponse;


@FeignClient(name = "file-service", url = "http://localhost:8087" ,configuration = AuthenticationRequestInterceptor.class    
)
public interface FileClient {

    @GetMapping("/file/media/tours")
    List<TourFileResponse> getAllMedia();

    @PostMapping(value = "file/media/uploadTour/{tourId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    List<TourFileResponse> uploadMultipleFiles(
         @PathVariable("tourId") String tourId,
        @RequestPart("files") List<MultipartFile> files
    );

}