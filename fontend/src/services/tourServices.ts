import axiosClient from "@/api/axios";
import type { ITourResponse } from "@/types/Tour";
import axios from "axios";

export const getAllTours = async () => {
  try {
    const res: ITourResponse = await axiosClient.get("/tour/tours");
    if (res.code !== 1000) {
      throw new Error(res?.message || "Get all tours failed");
    }
    return res;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverError = err.response?.data as { message?: string };
      throw new Error(serverError?.message || "Get all tours failed");
    }
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Unexpected error");
  }
};

export const getTourById = (id: number) => {
  return axiosClient.get(`/tour/tours/${id}`);
};
