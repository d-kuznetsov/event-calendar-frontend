import { createStore as createVuexStore, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { InjectionKey, State, IService, Event } from "./types";
import { AxiosInstance } from "axios";
import httpClient from "./http-client";
import Service from "./service";
import { getWeekPeriod } from "../lib/date-helper";

export const key: InjectionKey = Symbol();

export function useStore() {
  return baseUseStore(key);
}

function createStore(service: IService, httpClient: AxiosInstance) {
  httpClient.interceptors.request.use((config) => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  });

  const store = createVuexStore<State>({
    state() {
      return {
        user: null,
        events: [],
        token: null,
        period: getWeekPeriod(new Date()),
      };
    },
    getters: {
      isLoggedIn(state) {
        return !!state.user;
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
    },
    actions: {
      register({ commit }, userData) {
        return service.register(userData).then(({ name, token }) => {
          commit("setToken", token);
          commit("setUser", { name });
        });
      },
      login({ commit }, credentials) {
        return service.login(credentials).then(({ name, token }) => {
          commit("setToken", token);
          commit("setUser", { name });
        });
      },
      logout({ commit }) {
        commit("removeToken");
        commit("removeUser");
      },
      fetchEvents({ commit }) {
        return service.fetchUserEvents().then((events) => {
          commit("setEvents", events);
        });
      },
      updateEvent(_, e: Event) {
        return service.updateEvent(e);
      },
      createEvent(_, e: Event) {
        return service.createEvent(e);
      },
    },
    plugins: [createPersistedState()],
  });

  return store;
}

export const store = createStore(new Service(httpClient), httpClient);

store.subscribe((m, s) => {
  console.log(m);
  console.log(JSON.stringify(s, null, 2));
});
