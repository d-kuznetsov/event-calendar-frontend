import { createStore as createVuexStore, useStore as baseUseStore } from "vuex";
import { InjectionKey, State, IService, Event, TOKEN_KEY } from "./types";
import httpClient from "./http-client";
import Service from "./service";
import { getWeekPeriod, getNextDate, getPrevDate } from "../lib/date-helper";
import { notifyError } from "../notification";

export const key: InjectionKey = Symbol();

export function useStore() {
  return baseUseStore(key);
}

function createStore(service: IService) {
  return createVuexStore<State>({
    state() {
      return {
        user: null,
        events: [],
        token: localStorage?.getItem(TOKEN_KEY) || null,
        period: getWeekPeriod(new Date()),
      };
    },
    getters: {
      isLoggedIn(state) {
        return !!state.token;
      },
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
      removeUser(state) {
        state.user = null;
      },
      setToken(state, token) {
        state.token = token;
      },
      removeToken(state) {
        state.token = null;
      },
      setEvents(state, events) {
        state.events = events;
      },
      incrementWeek(state) {
        const monday = getNextDate(state.period[1]);
        state.period = getWeekPeriod(monday);
      },
      decrementWeek(state) {
        const sunday = getPrevDate(state.period[0]);
        state.period = getWeekPeriod(sunday);
      },
    },
    actions: {
      register({ commit }, userData) {
        return service
          .register(userData)
          .then(({ name, token }) => {
            commit("setToken", token);
            commit("setUser", { name });
            localStorage?.setItem(TOKEN_KEY, token);
            return true;
          })
          .catch((err) => {
            const { status, data: message } = err.response;
            if (status == 400 && message) {
              notifyError(message);
              return false;
            }
            notifyError("Something went wrong");
            throw err;
          });
      },
      login({ commit }, credentials) {
        return service
          .login(credentials)
          .then(({ name, token }) => {
            commit("setToken", token);
            commit("setUser", { name });
            localStorage?.setItem(TOKEN_KEY, token);
            return true;
          })
          .catch((err) => {
            const { status, data: message } = err.response;
            if (status == 400 && message) {
              notifyError(message);
              return false;
            }
            notifyError("Something went wrong");
            throw err;
          });
      },
      logout({ commit }) {
        commit("removeToken");
        commit("removeUser");
        localStorage?.removeItem(TOKEN_KEY);
      },
      fetchEvents({ state, commit }) {
        const [start, end] = state.period;
        return service
          .fetchUserEvents(start, end)
          .then((events) => {
            commit("setEvents", events);
          })
          .catch((err) => {
            notifyError("Something went wrong");
            throw err;
          });
      },
      updateEvent(_, e: Event) {
        return service.updateEvent(e).catch((err) => {
          notifyError("Something went wrong");
          throw err;
        });
      },
      createEvent(_, e: Event) {
        return service.createEvent(e).catch((err) => {
          notifyError("Something went wrong");
          throw err;
        });
      },
      deleteEvent(_, id: string) {
        return service.deleteEvent(id).catch((err) => {
          notifyError("Something went wrong");
          throw err;
        });
      },
    },
  });
}

export const store = createStore(new Service(httpClient));

store.subscribe((m, s) => {
  console.log(m);
  console.log(JSON.stringify(s, null, 2));
});
