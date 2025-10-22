import axiosClient from '@/api/axios';
import type { AxiosResponse } from '@/types/comment';
import type {
  IItinerary,
  ITour,
  ITourDeparture,
  ITourDepartureResponse,
  ITourResponse,
} from '@/types/Tour';
import axios from 'axios';

export const getAllTours = async () => {
  try {
    const res: ITourResponse = await axiosClient.get('/tour/tours/list');
    if (res.code !== 1000) {
      throw new Error(res?.message || 'Get all tours failed');
    }
    return res;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverError = err.response?.data as { message?: string };
      throw new Error(serverError?.message || 'Get all tours failed');
    }
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Unexpected error');
  }
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

export const getTourDepartureId = async (id: number) => {
  try {
    const res: ITourDepartureResponse = await axiosClient.get(`/tour/tour-departures/${id}`);
    if (res.code !== 1000) {
      throw new Error(res?.message || 'Get all tours failed');
    }
    return res;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverError = err.response?.data as { message?: string };
      throw new Error(serverError?.message || 'Get all tours failed');
    }
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Unexpected error');
  }
};
