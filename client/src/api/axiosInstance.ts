import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const getFreshLocalStorage = () => {
  return localStorage.getItem("token");
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getFreshLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
