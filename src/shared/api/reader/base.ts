import axios from "axios";
import { API_URL } from "../../config";

const token =
  typeof window !== "undefined" && window.localStorage.getItem("token");


const ReaderApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

ReaderApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default ReaderApi;
