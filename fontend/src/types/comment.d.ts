export interface UserResponse {
  id: number;
  name: string;
  avatar?: string;
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

