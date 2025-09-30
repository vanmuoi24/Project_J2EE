import { sessionService } from "@/services/sessionServices";
import axios from "axios";


const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8888/api/v1",
  headers: { "Content-Type": "application/json" },
});

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
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
