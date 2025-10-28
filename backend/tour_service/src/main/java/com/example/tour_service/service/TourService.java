package com.example.tour_service.service;

import com.example.tour_service.repository.httpClient.PricingClient;
import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.request.TourRequest;
import com.example.tour_service.dto.response.LocationResponse;
import com.example.tour_service.dto.response.TourFileResponse;
import com.example.tour_service.dto.response.TourPriceResponse;
import com.example.tour_service.dto.response.TourResponse;
import com.example.tour_service.dto.response.VehicleResponse;
import com.example.tour_service.entity.Location;
import com.example.tour_service.entity.Tour;
import com.example.tour_service.entity.Vehicle;
import com.example.tour_service.exception.AppException;
import com.example.tour_service.exception.ErrorCode;
import com.example.tour_service.repository.LocationRepository;
import com.example.tour_service.repository.TourRepository;
import com.example.tour_service.repository.VehicleRepository;
import com.example.tour_service.repository.httpClient.FileClient;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;
    private final LocationRepository locationRepository; // cần thêm repo cho Location
    private final VehicleRepository vehicleRepository;
    private final PricingClient pricingClient;
        private final FileClient fileClient;
    public TourResponse getTourById(int id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));

        TourResponse response = toResponse(tour);
        ApiResponse<TourPriceResponse> priceResp = pricingClient.getPriceById(tour.getTourPriceId());
        response.setTourPrice(priceResp.getResult());

        return response;
    }

    public List<TourResponse> getAllTours() {
            List<TourFileResponse> fileResponses = fileClient.getAllMedia();
            Map<String, List<String>> tourImagesMap = fileResponses.stream()
                            .filter(f -> f.getUrl() != null && !f.getUrl().isEmpty())
                            .collect(Collectors.groupingBy(
                                            TourFileResponse::getTourId,
                                            Collectors.mapping(TourFileResponse::getUrl, Collectors.toList())));
            return tourRepository.findAll().stream()
                            .map(tour -> {
                                    TourResponse response = toResponse(tour);
                                    ApiResponse<TourPriceResponse> priceResp = pricingClient
                                                    .getPriceById(tour.getTourPriceId());
                                    response.setTourPrice(priceResp.getResult());
                                    List<String> urls = tourImagesMap.get(String.valueOf(tour.getId()));
                                    response.setImageIds(urls != null ? urls : List.of());
                                    return response;
                            })
                            .collect(Collectors.toList());
    }

    @Transactional
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

            return toResponse(saved);
    }

    public TourResponse updateTour(int id, TourRequest request) {
        Tour existingTour = tourRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));

        Location existingDepartureLocation = locationRepository.findById(request.getDepartureLocationId())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));

        Location existingDestinationLocation = locationRepository.findById(request.getDestinationLocationId())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));


        Vehicle existingVehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));


        //Cap nhat Tour
        existingTour.setTourTitle(request.getTourTitle());
        existingTour.setDescription(request.getDescription());
        existingTour.setDuration(request.getDuration());
        existingTour.setDepartureLocation(existingDepartureLocation);
        existingTour.setDestinationLocation(existingDestinationLocation);
        existingTour.setVehicle(existingVehicle);
        existingTour.setTourPriceId(request.getTourPriceId());

        Tour saved = tourRepository.save(existingTour);
        return toResponse(saved);
    }

    public void deleteTour(int id) {
        if (!tourRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_KEY);
        }

        tourRepository.deleteById(id);
    }



    private TourResponse toResponse(Tour tour) {
        return TourResponse.builder()
                .id(tour.getId())
                .tourProgram(tour.getTourProgram())
                .tourTitle(tour.getTourTitle())
                .description(tour.getDescription())
                .duration(tour.getDuration())
                .departureCity(
                        LocationResponse.builder()
                                .city(tour.getDepartureLocation().getCity())
                                .build()
                )
                .destinationCity(
                        LocationResponse.builder()
                                .city(tour.getDestinationLocation().getCity())
                                .build()
                )
                .basePrice(tour.getBasePrice())
                .vehicle(
                        VehicleResponse.builder()
                                .id(tour.getVehicle().getId())
                                .name(tour.getVehicle().getVehicleType())
                                .build()
                )
                .build();
    }
}
