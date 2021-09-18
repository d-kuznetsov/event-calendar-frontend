import { InjectionKey as VueInjectionKey } from "vue";
import { Store } from "vuex";

export interface User {
  name: string;
}

export interface Event {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  content: string;
  userId: string;
}

export interface State {
  user: User | null;
  events: Array<Event>;
  token: string | null;
  period: [string, string];
}

export type InjectionKey = VueInjectionKey<Store<State>>;

export interface EntryData extends User {
  token: string;
}

export interface IService {
  register(params: any): Promise<EntryData>;
  login(params: any): Promise<EntryData>;
  fetchUserEvents(): Promise<Array<Event>>;
  updateEvent(e: Event): Promise<boolean>;
  createEvent(e: Event): Promise<string>;
}
