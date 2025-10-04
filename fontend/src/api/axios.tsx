import { sessionService } from "@/services/sessionServices";
import axios, { AxiosError } from "axios";


const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8888/api/v1",
  headers: { "Content-Type": "application/json" },
});


let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Interceptor request 
axiosClient.interceptors.request.use((config) => {
  const token = sessionService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor response
axiosClient.interceptors.response.use(
  (response) => response.data,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
   async (error: AxiosError<any>) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh thì đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = "Bearer " + token;
          return axiosClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const token = sessionService.getToken();
        if (!token) {
          sessionService.clearSession();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Gọi API refresh token
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/users/refresh`,
          { token }
        );

        const newToken = res.data.result.token;
        const user = res.data.result.user;
        sessionService.setSession(newToken, user);

        processQueue(null, newToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = "Bearer " + newToken;
        return axiosClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        sessionService.clearSession();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
  }
);

export default axiosClient;
