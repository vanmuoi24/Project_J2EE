import axiosClient from '@/api/axios';
import type { AxiosResponse } from '@/types/comment';
import type { IPaginationResponse } from '@/types/Pagination';
import type {
  DepartureDateRequest,
  ICity,
  IDeparture,
  IDestination,
  IItinerary,
  ILocation,
  ItineraryRequest,
  ITour,
  ITourDeparture,
  ITourPrice,
  IVehicle,
  LocationRequest,
  TourPriceRequest,
  TourRequest,
} from '@/types/Tour';

export const searchTours = (
  params: URLSearchParams
): Promise<AxiosResponse<IPaginationResponse<ITour>>> => {
  return axiosClient.get(`/tour/tours/search?${params.toString()}`);
};

export const getAllTours = (): Promise<AxiosResponse<ITour[]>> => {
  return axiosClient.get('/tour/tours/list');
};

export const getTourById = (id: number): Promise<AxiosResponse<ITour>> => {
  return axiosClient.get(`/tour/tours/${id}`);
};

export const getDepartureByTourId = (id: number): Promise<AxiosResponse<ITourDeparture[]>> => {
  return axiosClient.get(`/tour/tour-departures/tour/${id}`);
};

export const getTourDepartureById = (id: number): Promise<AxiosResponse<ITourDeparture>> => {
  return axiosClient.get(`/tour/tour-departures/${id}`);
};

export const getItineraryByTourId = (id: number): Promise<AxiosResponse<IItinerary[]>> => {
  return axiosClient.get(`/tour/itineraries/tour/${id}`);
};

export const getAllLocation = (): Promise<AxiosResponse<ILocation[]>> => {
  return axiosClient.get(`/tour/locations/all`);
};

export const getAllDepartures = (): Promise<AxiosResponse<ILocation[]>> => {
  return axiosClient.get(`/tour/locations/departures`);
};

export const getAllDestinations = (): Promise<AxiosResponse<ILocation[]>> => {
  return axiosClient.get(`/tour/locations/destinations`);
};

export const getAllVehicles = (): Promise<AxiosResponse<IVehicle[]>> => {
  return axiosClient.get(`/tour/vehicles/list`);
};

export const getAllItineraries = (): Promise<AxiosResponse<IItinerary[]>> => {
  return axiosClient.get(`/tour/itineraries/all`);
};

export const getAllPrice = (): Promise<AxiosResponse<ITourPrice[]>> => {
  return axiosClient.get(`/pricing/prices`);
};

export const searchLocation = (
  key: string,
  isDep: boolean = true
): Promise<AxiosResponse<ICity[]>> => {
  return axiosClient.get(
    `/tour/locations/${isDep ? 'departures' : 'destinations'}/search?keyword=${key}`
  );
};

export const addLocation = (data: LocationRequest): Promise<AxiosResponse<ILocation>> => {
  return axiosClient.post(`/tour/locations`, data);
};

export const deleteLocation = (id: number): Promise<AxiosResponse<any>> => {
  return axiosClient.delete(`/tour/locations/${id}`);
};

export const addItinerary = (data: ItineraryRequest): Promise<AxiosResponse<IItinerary>> => {
  return axiosClient.post(`tour/itineraries`, data);
}

export const addPrice = (data: TourPriceRequest): Promise<AxiosResponse<ITourPrice>> => {
  return axiosClient.post(`pricing/prices`, data);
}

export const addTourDeparture = (data: DepartureDateRequest): Promise<AxiosResponse<ITourDeparture>> => {
  return axiosClient.post(`tour/tour-departures`, data);
}

export const addTour = (data: TourRequest): Promise<AxiosResponse<ITour>> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "files" && Array.isArray(value)) {
      value.forEach((file: File) => formData.append("files", file));
    } else {
      formData.append(key, String(value));
    }
  });

  return axiosClient.post(`tour/tours`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

