package com.example.tour_service.service;

import com.example.tour_service.client.PricingClient;
import com.example.tour_service.dto.request.ApiResponse;
import com.example.tour_service.dto.request.TourRequest;
import com.example.tour_service.dto.response.LocationResponse;
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
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;
    private final LocationRepository locationRepository; // cần thêm repo cho Location
    private final VehicleRepository vehicleRepository;
    private final PricingClient pricingClient;

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

        return toResponse(saved);
    }

    public TourResponse getTourById(int id, boolean includePrice) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));

        TourResponse response = toResponse(tour);
        System.out.println("na");

        if (includePrice && tour.getTourPriceId() != null) {
            try {
                System.out.println("Calling PricingClient with id: " + tour.getTourPriceId());
                ApiResponse<TourPriceResponse> priceResp = pricingClient.getPriceById(tour.getTourPriceId());
                System.out.println("priceResp: " + priceResp);
                response.setTourPrice(priceResp.getResult());
                System.out.println("ha");
            } catch (FeignException e) {
                System.out.println("FeignException: status=" + e.status() + ", body=" + e.contentUTF8());
                response.setTourPrice(null);
            } catch (Exception e) {
                System.out.println("Other exception: " + e.getMessage());
                response.setTourPrice(null);
            }
        }

        return response;
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
                .tourPriceId(tour.getTourPriceId())
                .build();
    }
}
