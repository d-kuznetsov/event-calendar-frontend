import { createStore as createVuexStore, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { InjectionKey, State, IService } from "./types";
import Service from "./service";

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
        token: null,
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
      fetchEvents({ state, commit }) {
        return service.fetchUserEvents(state.token).then((events) => {
          commit("setEvents", events);
        });
      },
    },
    plugins: [createPersistedState()],
  });
}

export const store = createStore(new Service());

store.subscribe((m, s) => {
  console.log(m);
  console.log(JSON.stringify(s, null, 2));
});
