import axiosClient from '@/api/axios';
import type { LoginRequest, LoginResponse } from '@/types/Auth';
import { sessionService } from './sessionServices';
import axios from 'axios';

export const loginService = async (
	data: LoginRequest
): Promise<LoginResponse> => {
	try {
		const res: LoginResponse = await axiosClient.post(
			'/auth/users/login',
			data
		);

		if (res.code !== 1000) {
			throw new Error(res?.message || 'Login failed');
		}

		sessionService.setSession(res.result.token, res.result.user);

		return res;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			const serverError = err.response?.data as { message?: string };
			throw new Error(serverError?.message || 'Login failed');
		}
		if (err instanceof Error) {
			throw err;
		}
		throw new Error('Unexpected error');
	}
};

export const logoutService = async (token: string): Promise<void> => {
	try {
		await axiosClient.post('/auth/users/logout', { token });
	} finally {
		sessionService.clearSession();
	}
};
