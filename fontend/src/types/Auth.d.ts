import type { User } from './User.d';

export type AuthState = {
	isAuth: boolean;
	user: User | null;
	token: string | null;
	loading: boolean;
	expiryTime: string | null;
	error: string | null;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	code: number;
	message?: string;
	result: {
		token: string;
		expiryTime: string;
		user: User;
	};
};
