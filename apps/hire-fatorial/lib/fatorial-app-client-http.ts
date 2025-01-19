import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const apiClient: CustomAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

interface CustomAxiosInstance extends AxiosInstance {
  post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
}

apiClient.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    config.headers["Authorization"] = `Basic ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received from API:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
