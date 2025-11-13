import axiosClient from '@/api/axios';
import type { BookingRequest, BookingResponse, CustomerResponse } from '@/types/Booking';
import axios from 'axios';
import type { AxiosResponse } from '@/types/comment';
/**
 * Create a new booking
 * POST /booking/bookings
 */
export const createBooking = async (
	data: BookingRequest
): Promise<AxiosResponse<BookingResponse>> => {
	try {
		const res: AxiosResponse<BookingResponse> = await axiosClient.post(
			'/booking/book/create',
			data
		);
		if (res.code !== 1000) {
			throw new Error('Create booking failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Create booking failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
};

/**
 * Get booking history for the current user
 * GET /booking/bookings
 */
export const getAllBooking = async (): Promise<AxiosResponse<BookingResponse>> => {
	try {
		const res: AxiosResponse<BookingResponse> = await axiosClient.get('/booking/book/all');
		if (res.code !== 1000) {
			throw new Error('Get booking history failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Get booking history failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
};

/**
 * Get a single booking by id
 * GET /booking/bookings/:id
 */
export const getBookingById = async (id: number): Promise<AxiosResponse<BookingResponse>> => {
	try {
		const res: AxiosResponse<BookingResponse> = await axiosClient.get(
			`/booking/book/${id}`
		);
		if (res.code !== 1000) {
			throw new Error('Get booking failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Get booking failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
};

export const getAllBookingCustomers = async (): Promise<AxiosResponse<CustomerResponse>> => {
	try {
		const res: AxiosResponse<CustomerResponse> = await axiosClient.get('/booking/customer/all');
		if (res.code !== 1000) {
			throw new Error('Get booking customers failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Get booking customers failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
};

export const getListOfCustomersByBookingId = async (id: number): Promise<AxiosResponse<CustomerResponse[]>> => {
	try {
		const res: AxiosResponse<CustomerResponse[]> = await axiosClient.get(`/booking/customer/booking/${id}`);
		if (res.code !== 1000) {
			throw new Error('Get booking customers failed');
		}
		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Get booking customers failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
}

export default {
	createBooking,
	getAllBooking,
	getBookingById,
	getAllBookingCustomers,
	getListOfCustomersByBookingId
};
