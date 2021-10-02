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

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status == 401) {
      localStorage.removeItem(TOKEN_KEY);
      setTimeout(() => location?.replace(`${location.origin}/login`));
    }
    return Promise.reject(err);
  }
);

export default httpClient;
