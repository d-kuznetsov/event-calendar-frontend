import { AxiosInstance } from "axios";
import { IService, EntryData, Event } from "./types";

export default class Service implements IService {
  httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
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

  async fetchUserEvents() {
    const res = await this.httpClient.get<Event[]>("/user-events");
    return res.data || [];
  }

  async updateEvent(e: Event) {
    await this.httpClient.post("/update-event", e);
    return true;
  }

  async createEvent(e: Event) {
    const res = await this.httpClient.post<string>("/create-event", e);
    return res.data;
  }
}
