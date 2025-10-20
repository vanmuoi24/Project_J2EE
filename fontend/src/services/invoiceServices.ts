import axiosClient from '@/api/axios';
import type { InvoiceRequest, InvoiceResponse } from '@/types/Invoice';
import axios from 'axios';

export const createInvoice = async (
	data: InvoiceRequest
): Promise<InvoiceResponse> => {
	try {
		const res: InvoiceResponse = await axiosClient.post('/invoice/invoices', data);
		if (res.code !== 1000) {
			throw new Error(res?.message || 'Create invoice failed');
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

export const getInvoiceHistory = async (): Promise<InvoiceResponse> => {
	try {
		const res: InvoiceResponse = await axiosClient.get('/invoice/invoices');
		if (res.code !== 1000) {
			throw new Error(res?.message || 'Get invoice history failed');
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

export const getInvoiceById = async (id: string): Promise<InvoiceResponse> => {
	try {
		const res: InvoiceResponse = await axiosClient.get(`/invoice/invoices/${id}`);
		if (res.code !== 1000) {
			throw new Error(res?.message || 'Get invoice failed');
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

export default {
	createInvoice,
	getInvoiceHistory,
	getInvoiceById,
};
