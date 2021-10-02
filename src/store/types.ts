import { InjectionKey as VueInjectionKey } from "vue";
import { Store } from "vuex";

export const TOKEN_KEY = "event-calendar-access-token";

export interface Event {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  content: string;
  userId: string;
}

export interface State {
  token: string | null;
  period: [string, string];
  events: Array<Event>;
}

export type InjectionKey = VueInjectionKey<Store<State>>;

export interface EntryData {
  token: string;
}

export interface IService {
  register(params: any): Promise<EntryData>;
  login(params: any): Promise<EntryData>;
  fetchEvents(periodStart: string, periodEnd: string): Promise<Array<Event>>;
  updateEvent(event: Event): Promise<boolean>;
  createEvent(event: Event): Promise<string>;
  deleteEvent(id: string): Promise<boolean>;
}
