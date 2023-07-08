import axios, { AxiosInstance } from "axios";

const appAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5555",
});

appAxios.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token") || "";
  return config;
});

export default appAxios;