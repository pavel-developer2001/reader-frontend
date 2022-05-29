import axios from "axios";

const token =
  typeof window !== "undefined" && window.localStorage.getItem("token");

const API_URL = "http://localhost:5000/";

const ReaderApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

ReaderApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default ReaderApi;
