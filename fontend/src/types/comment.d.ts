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
  result: T; // dữ liệu trả về từ server
  code: number; // mã HTTP status (200, 404, 500, ...)
  statusText: string; // ví dụ: "OK"
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
export interface CreateCommentRequest {
  tourId: number;
  content: string;
  rating: number;
  userId: number;
}

