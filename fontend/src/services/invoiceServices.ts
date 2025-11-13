import axiosClient from "@/api/axios";
import type { InvoiceRequest, InvoiceResponse } from "@/types/Invoice";
import type { AxiosResponse } from '@/types/comment';

const INVOICE_API = "/invoice/direct";

const invoiceServices = {
  create: (data: any): Promise<AxiosResponse> => {
    return axiosClient.post(`${INVOICE_API}/create`, data);
  },

  getAll: (): Promise<AxiosResponse> => {
    return axiosClient.get(`${INVOICE_API}/all`);
  },

  getById: (id: number): Promise<AxiosResponse> => {
    return axiosClient.get(`${INVOICE_API}/${id}`);
  },

  getByBookingId: (bookingId: number): Promise<AxiosResponse> => {
    return axiosClient.get(`${INVOICE_API}/booking/${bookingId}`);
  },
};

export default invoiceServices;
