import axios from "axios";
import { TOKEN_KEY } from "./types";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 10000,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage?.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default httpClient;
