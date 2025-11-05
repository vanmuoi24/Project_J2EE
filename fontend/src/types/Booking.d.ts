import type { User } from './User.d';

export type Customer = {
	fullName: string;
	birthdate: string; // ISO date string (yyyy-MM-dd)
	address?: string;
	gender?: string;
	status?: string;
	id?: string;
};

export type BookingRequest = {
	userId: string; // account id as string (comes from session)
	tourDepartureId: string; // id from url
	listOfCustomers: Customer[]; // customers from the booking form
};

export type BookingResponse = {
	id: string;
	accountId?: string;
	tourDepartureId?: string;
	createdAt?: string;
	status?: string;
	listOfCustomers?: Customer[];
};
