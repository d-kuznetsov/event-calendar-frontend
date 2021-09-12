import axios, { AxiosInstance } from "axios";
import { IService, EntryData, Event } from "./types";

export default class Service implements IService {
  httpClient: AxiosInstance;
  token: string | null;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://localhost:8080/",
      timeout: 1000,
    });
    this.token = null;

    this.httpClient.interceptors.request.use((config) => {
      debugger;
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    });
  }

  async register(userData: { name: string; email: string; password: string }) {
    const res = await this.httpClient.post<EntryData>("/register", {
      ...userData,
    });
    return res.data;
  }

  async login(credentials: { email: string; password: string }) {
    const res = await this.httpClient.post<EntryData>("/login", {
      ...credentials,
    });
    return res.data;
  }

  async fetchUserEvents(token: string) {
    this.token = token;
    const res = await this.httpClient.get<Event[]>("/user-events");
    return res.data;
  }
}
