import axiosClient from '@/api/axios';
import type { AxiosResponse } from '@/types/comment';
import type { IUserUpdate, User } from '@/types/User';

export const updateProfile = (
  data: IUserUpdate,
  id: number | undefined
): Promise<AxiosResponse<User>> => {
  const formData = new FormData();
  if (data.file) {
    formData.append('file', data.file);
  }
  if (data.username) {
    formData.append('username', data.username);
  }
  if (data.phone) {
    formData.append('phone', data.phone);
  }
  if (data.address) {
    formData.append('address', data.address);
  }

  return axiosClient.post(`auth/users/UpdateUser/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
