import axiosClient from '@/api/axios';
import type { AxiosResponse } from '@/types/comment';
import type { IPaginationResponse } from '@/types/Pagination';
import type {
  ICity,
  IDestination,
  IItinerary,
  ITour,
  ITourDeparture,
  ITourDepartureResponse,
  IVehicle,
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

export const getAllTourDeparture = (): Promise<AxiosResponse<ITourDeparture[]>> =>{
  return axiosClient.get(`/tour/tour-departures/list`);
}

export const getTourDepartureById = (id: number): Promise<AxiosResponse<ITourDeparture>> => {
  return axiosClient.get(`/tour/tour-departures/${id}`);
};

export const getItineraryByTourId = (id: number): Promise<AxiosResponse<IItinerary[]>> => {
  return axiosClient.get(`/tour/itineraries/tour/${id}`);
};

export const getAllDepartures = (): Promise<AxiosResponse<ITourDeparture[]>> => {
  return axiosClient.get(`/tour/locations/departures`);
};

export const getAllDestinations = (): Promise<AxiosResponse<IDestination[]>> => {
  return axiosClient.get(`/tour/locations/destinations`);
};

export const getAllVehicles = (): Promise<AxiosResponse<IVehicle[]>> => {
  return axiosClient.get(`/tour/vehicles/list`);
};

export const searchLocation = (
  key: string,
  isDep: boolean = true
): Promise<AxiosResponse<ICity[]>> => {
  return axiosClient.get(
    `/tour/locations/${isDep ? 'departures' : 'destinations'}/search?keyword=${key}`
  );
};
