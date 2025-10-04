import axiosClient from '@/api/axios';

export const getAllTours = async () => {
	const res = await axiosClient.get('/tour/tours');

	console.log('đaad: ', res);
};
