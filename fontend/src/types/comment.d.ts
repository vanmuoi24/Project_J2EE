export interface UserResponse {
  id: number;
  username: string;
  avatar?: string;
  address: string;
  email: string;
  phone: string;
}

export interface ReviewResponse {
  id: number;
  tourId: number;
  user: UserResponse;
  content: string;
  rating: number;
  createdAt: string;
}
interface AxiosResponse<T = any> {
  result: T;
  code: number;
}
export interface CreateCommentRequest {
  tourId: number;
  content: string;
  rating: number;
  userId: number;
}
