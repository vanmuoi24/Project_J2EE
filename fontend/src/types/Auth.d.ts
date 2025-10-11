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
export type RegisterRequest = {
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	dob?: string;
	city?: string;
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
export type RegisterResponse = {
	code: number;
	message?: string;
	result: {
		id: number;
		username: string;
		email: string;
	};
};