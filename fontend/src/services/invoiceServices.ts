import axiosClient from '@/api/axios';
import type { InvoiceRequest, InvoiceResponse } from '@/types/Invoice';
import axios from 'axios';
import type { AxiosResponse } from '@/types/comment';

export const createInvoice = async (
	data: InvoiceRequest
): Promise<AxiosResponse<InvoiceResponse>> => {
	try {
		const res: AxiosResponse<InvoiceResponse> = await axiosClient.post('/invoice/create', data);
		if (res.code !== 1000) {
			throw new Error('Create invoice failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Create invoice failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
};

export const getAllInvoices = async (): Promise<AxiosResponse<InvoiceResponse>> => {
	try {
		const res: AxiosResponse<InvoiceResponse> = await axiosClient.get('/invoice/direct/all');
		if (res.code !== 1000) {
			throw new Error('Get all invoices failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Get invoice history failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
};

export const getInvoiceById = async (id: string): Promise<AxiosResponse<InvoiceResponse>> => {
	try {
		const res: AxiosResponse<InvoiceResponse> = await axiosClient.get(`/invoice/invoices/${id}`);
		if (res.code !== 1000) {
			throw new Error('Get invoice failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Get invoice failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
};

export const getInvoiceByBookingId = async (bookingId: string): Promise<AxiosResponse<InvoiceResponse>> => {
	try {
		const res: AxiosResponse<InvoiceResponse> = await axiosClient.get(`/invoice/direct/booking/${bookingId}`);	
		if (res.code !== 1000) {
			throw new Error('Get invoice failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Get invoice failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
}

export default {
	createInvoice,
	getAllInvoices,
	getInvoiceById,
	getInvoiceByBookingId
};
