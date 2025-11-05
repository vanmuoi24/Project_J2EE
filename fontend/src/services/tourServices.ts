import axiosClient from '@/api/axios';
import type { AxiosResponse } from '@/types/comment';
import type {
  IDeparture,
  IDestination,
  IItinerary,
  ITour,
  ITourDeparture,
  IVehicle,
} from '@/types/Tour';

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

export const getAllDepartures = (): Promise<AxiosResponse<IDeparture[]>> => {
  return axiosClient.get(`/tour/locations/departures`);
};

export const getAllDestinations = (): Promise<AxiosResponse<IDestination[]>> => {
  return axiosClient.get(`/tour/locations/destinations`);
};

export const getAllVehicles = (): Promise<AxiosResponse<IVehicle[]>> => {
  return axiosClient.get(`/tour/vehicles/list`);
};
