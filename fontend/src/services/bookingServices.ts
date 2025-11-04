import axiosClient from '@/api/axios';
import type { BookingRequest, BookingResponse } from '@/types/Booking';
import axios from 'axios';

/**
 * Create a new booking
 * POST /booking/bookings
 */
export const createBooking = async (
	data: BookingRequest
): Promise<BookingResponse> => {
	try {
		const res: BookingResponse = await axiosClient.post(
			'/booking/book/create',
			data
		);
		if (res.code !== 1000) {
			throw new Error(res?.message || 'Create booking failed');
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
export const getAllBooking = async (): Promise<BookingResponse> => {
	try {
		const res: BookingResponse = await axiosClient.get('/booking/book/all');
		if (res.code !== 1000) {
			throw new Error(res?.message || 'Get booking history failed');
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
export const getBookingById = async (id: string): Promise<BookingResponse> => {
	try {
		const res: BookingResponse = await axiosClient.get(
			`/booking/book/${id}`
		);
		if (res.code !== 1000) {
			throw new Error(res?.message || 'Get booking failed');
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

export default {
	createBooking,
	getAllBooking,
	getBookingById,
};
