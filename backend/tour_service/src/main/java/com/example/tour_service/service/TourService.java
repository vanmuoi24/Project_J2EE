package com.example.tour_service.service;

import com.example.tour_service.dto.request.TourPriceBatchRequest;
import com.example.tour_service.dto.request.UpdateTourRequest;
import com.example.tour_service.dto.response.*;
import com.example.tour_service.repository.httpClient.PricingClient;
import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.request.TourRequest;
import com.example.tour_service.entity.Location;
import com.example.tour_service.entity.Tour;
import com.example.tour_service.entity.Vehicle;
import com.example.tour_service.exception.AppException;
import com.example.tour_service.exception.ErrorCode;
import com.example.tour_service.repository.LocationRepository;
import com.example.tour_service.repository.TourRepository;
import com.example.tour_service.repository.VehicleRepository;
import com.example.tour_service.repository.httpClient.FileClient;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService {

        private final TourRepository tourRepository;
        private final LocationRepository locationRepository;
        private final VehicleRepository vehicleRepository;
        private final PricingClient pricingClient;
        private final FileClient fileClient;
        private final TourDepartureService tourDepartureService;

        public TourResponse getTourById(int id) {
                Tour tour = tourRepository.findById(id)
                                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));

                TourResponse response = toResponse(tour);

                ApiResponse<TourPriceResponse> priceResp = pricingClient.getPriceById(tour.getTourPriceId());
                response.setTourPrice(priceResp.getResult());

                List<TourDepartureResponse> departures = tourDepartureService.getTourDepartureByTourId(id);
                response.setDepartures(departures);

                List<TourFileResponse> fileResponses = fileClient.getAllMedia();
                List<String> tourImages = fileResponses.stream()
                                .filter(f -> String.valueOf(id).equals(f.getTourId()))
                                .filter(f -> f.getUrl() != null && !f.getUrl().isEmpty())
                                .map(TourFileResponse::getUrl)
                                .collect(Collectors.toList());

                response.setImageIds(tourImages);

                return response;
        }

        public List<TourResponse> getAllTours() {
                List<Tour> tours = tourRepository.findAll();

                // Batch prices for tours
                List<Long> priceIds = tours.stream()
                        .map(Tour::getTourPriceId)
                        .distinct()
                        .toList();

                TourPriceBatchRequest priceBatchReq = new TourPriceBatchRequest();
                priceBatchReq.setIds(priceIds);

                List<TourPriceResponse> priceList = pricingClient.getPricesBatch(priceBatchReq).getResult();
                Map<Long, TourPriceResponse> priceMap = priceList.stream()
                        .collect(Collectors.toMap(TourPriceResponse::getId, p -> p));

                // Batch departures for tours
                List<Integer> tourIds = tours.stream().map(Tour::getId).toList();
                Map<Integer, List<TourDepartureResponse>> departuresMap =
                        tourDepartureService.getDeparturesByTourIdsWithPrice(tourIds);

                List<TourFileResponse> fileResponses = fileClient.getAllMedia();
                Map<String, List<String>> tourImagesMap = fileResponses.stream()
                        .filter(f -> f.getUrl() != null && !f.getUrl().isEmpty())
                        .collect(Collectors.groupingBy(
                                TourFileResponse::getTourId,
                                Collectors.mapping(TourFileResponse::getUrl, Collectors.toList())
                        ));

                return tours.stream()
                        .map(tour -> {
                                TourResponse response = toResponse(tour);
                                response.setTourPrice(priceMap.get(tour.getTourPriceId()));

                                List<String> urls = tourImagesMap.get(String.valueOf(tour.getId()));
                                response.setImageIds(urls != null ? urls : List.of());

                                response.setDepartures(departuresMap.getOrDefault(tour.getId(), List.of()));

                                return response;
                        })
                        .toList();
        }

        public List<TourResponse> getRandom3Tours() {

                // Lấy toàn bộ tour trong DB
                List<Tour> tours = tourRepository.findAll();

                if (tours.isEmpty()) return List.of();

                // Shuffle để ngẫu nhiên
                Collections.shuffle(tours);

                // Chỉ lấy 3 tour đầu tiên
                List<Tour> selectedTours = tours.stream()
                        .limit(3)
                        .toList();

                // BATCH PRICE
                List<Long> priceIds = selectedTours.stream()
                        .map(Tour::getTourPriceId)
                        .distinct()
                        .toList();

                TourPriceBatchRequest priceBatchReq = new TourPriceBatchRequest();
                priceBatchReq.setIds(priceIds);

                Map<Long, TourPriceResponse> priceMap = pricingClient
                        .getPricesBatch(priceBatchReq)
                        .getResult()
                        .stream()
                        .collect(Collectors.toMap(TourPriceResponse::getId, p -> p));

                // BATCH DEPARTURES
                List<Integer> tourIds = selectedTours.stream()
                        .map(Tour::getId)
                        .toList();

                Map<Integer, List<TourDepartureResponse>> departuresMap =
                        tourDepartureService.getDeparturesByTourIdsWithPrice(tourIds);

                List<TourFileResponse> fileResponses = fileClient.getAllMedia();
                Map<String, List<String>> tourImagesMap = fileResponses.stream()
                        .filter(f -> f.getUrl() != null && !f.getUrl().isEmpty())
                        .collect(Collectors.groupingBy(
                                TourFileResponse::getTourId,
                                Collectors.mapping(TourFileResponse::getUrl, Collectors.toList())
                        ));

                return selectedTours.stream()
                        .map(tour -> {
                                TourResponse response = toResponse(tour);

                                response.setTourPrice(priceMap.get(tour.getTourPriceId()));

                                List<String> urls = tourImagesMap.get(String.valueOf(tour.getId()));
                                response.setImageIds(urls != null ? urls : List.of());

                                response.setDepartures(departuresMap.getOrDefault(tour.getId(), List.of()));

                                return response;
                        })
                        .toList();
        }


        public TourResponse createTour(TourRequest request) {
                Location departure = locationRepository.findById(request.getDepartureLocationId())
                                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));
                Location destination = locationRepository.findById(request.getDestinationLocationId())
                                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));
                Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));

                Tour tour = Tour.builder()
                                .tourProgram(request.getTourProgram())
                                .tourTitle(request.getTourTitle())
                                .description(request.getDescription())
                                .duration(request.getDuration())
                                .basePrice(request.getBasePrice())
                                .departureLocation(departure)
                                .destinationLocation(destination)
                                .vehicle(vehicle)
                                .tourPriceId(request.getTourPriceId())
                                .build();

                Tour saved = tourRepository.save(tour);

                if (request.getFiles() != null && !request.getFiles().isEmpty()) {
                        try {
                                fileClient.uploadMultipleFiles(
                                                String.valueOf(saved.getId()),
                                                request.getFiles());
                        } catch (Exception e) {
                                e.printStackTrace();
                        }
                }

                TourResponse response = toResponse(saved);

                // Lấy price
                ApiResponse<TourPriceResponse> priceResp = pricingClient.getPriceById(saved.getTourPriceId());
                response.setTourPrice(priceResp.getResult());

                List<TourDepartureResponse> departures = tourDepartureService.getTourDepartureByTourId(saved.getId());
                response.setDepartures(departures);

                List<TourFileResponse> fileResponses = fileClient.getAllMedia();
                List<String> tourImages = fileResponses.stream()
                        .filter(f -> String.valueOf(saved.getId()).equals(f.getTourId()))
                        .filter(f -> f.getUrl() != null && !f.getUrl().isEmpty())
                        .map(TourFileResponse::getUrl)
                        .collect(Collectors.toList());
                response.setImageIds(tourImages);

                return response;
        }

        public TourResponse updateTour(int id, UpdateTourRequest request) {
                // Lấy Tour hiện tại
                Tour existingTour = tourRepository.findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));

                // Cập nhật các trường text nếu client gửi
                if (request.getTourTitle() != null) {
                        existingTour.setTourTitle(request.getTourTitle());
                }
                if (request.getTourProgram() != null) {
                        existingTour.setTourProgram(request.getTourProgram());
                }
                if (request.getDescription() != null) {
                        existingTour.setDescription(request.getDescription());
                }
                if (request.getDuration() != 0) { // primitive int, nếu 0 coi như không gửi
                        existingTour.setDuration(request.getDuration());
                }
                if (request.getBasePrice() != null) {
                        existingTour.setBasePrice(request.getBasePrice());
                }
                if (request.getTourPriceId() != null) {
                        existingTour.setTourPriceId(request.getTourPriceId());
                }

                // Cập nhật các quan hệ nếu client gửi
                if (request.getDepartureLocationId() != 0) {
                        Location departure = locationRepository.findById(request.getDepartureLocationId())
                                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));
                        existingTour.setDepartureLocation(departure);
                }

                if (request.getDestinationLocationId() != 0) {
                        Location destination = locationRepository.findById(request.getDestinationLocationId())
                                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));
                        existingTour.setDestinationLocation(destination);
                }

                if (request.getVehicleId() != null) {
                        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));
                        existingTour.setVehicle(vehicle);
                }

                // Lưu Tour
                Tour saved = tourRepository.save(existingTour);

                // Upload file nếu có
                if (request.getFiles() != null && !request.getFiles().isEmpty()) {
                        try {
                                fileClient.uploadMultipleFiles(String.valueOf(saved.getId()), request.getFiles());
                        } catch (Exception e) {
                                e.printStackTrace();
                        }
                }


                // Xóa các file nếu client gửi url
                if (request.getUrl() != null && !request.getUrl().isEmpty()) {
                        try {
                                fileClient.deleteMultipleTourImagesByUrl(request.getUrl());
                        } catch (Exception e) {
                                e.printStackTrace();
                                // có thể log hoặc throw exception nếu muốn dừng update khi xóa file thất bại
                        }
                }

                // Tạo response
                TourResponse response = toResponse(saved);

                // Lấy giá từ pricing service
                if (saved.getTourPriceId() != null) {
                        ApiResponse<TourPriceResponse> priceResp = pricingClient.getPriceById(saved.getTourPriceId());
                        response.setTourPrice(priceResp.getResult());
                }

                // Lấy danh sách departures
                List<TourDepartureResponse> departures = tourDepartureService.getTourDepartureByTourId(saved.getId());
                response.setDepartures(departures);

                // Lấy danh sách hình ảnh
                List<TourFileResponse> fileResponses = fileClient.getAllMedia();
                List<String> tourImages = fileResponses.stream()
                        .filter(f -> String.valueOf(saved.getId()).equals(f.getTourId()))
                        .filter(f -> f.getUrl() != null && !f.getUrl().isEmpty())
                        .map(TourFileResponse::getUrl)
                        .collect(Collectors.toList());
                response.setImageIds(tourImages);

                return response;
        }

//        public void deleteTour(int id) {
//                if (!tourRepository.existsById(id)) {
//                        throw new AppException(ErrorCode.INVALID_KEY);
//                }
//
//                tourRepository.deleteById(id);
//        }

        private TourResponse toResponse(Tour tour) {
                return TourResponse.builder()
                                .id(tour.getId())
                                .tourProgram(tour.getTourProgram())
                                .tourTitle(tour.getTourTitle())
                                .description(tour.getDescription())
                                .duration(tour.getDuration())
                                .departureCity(
                                                LocationResponse.builder()
                                                                .id(tour.getDepartureLocation().getId())
                                                                .city(tour.getDepartureLocation().getCity())
                                                                .type(tour.getDepartureLocation().getType())
                                                                .build())
                                .destinationCity(
                                                LocationResponse.builder()
                                                                .id(tour.getDestinationLocation().getId())
                                                                .city(tour.getDestinationLocation().getCity())
                                                                .type(tour.getDestinationLocation().getType())
                                                                .build())
                                .basePrice(tour.getBasePrice())
                                .vehicle(
                                                VehicleResponse.builder()
                                                                .id(tour.getVehicle().getId())
                                                                .name(tour.getVehicle().getVehicleType())
                                                                .build())
                                .build();
        }
}