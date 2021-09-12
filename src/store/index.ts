import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import service from "./service";

interface User {
  name: string;
  email: string;
}

export interface State {
  user: User | null;
  token: string | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export const store = createStore<State>({
  state() {
    return {
      user: null,
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
  },
  actions: {
    register({ commit }, userData) {
      return service.register(userData).then((token) => {
        commit("setToken", token);
        commit("setUser", userData);
      });
    },
    login({ commit }, credentials) {
      return service.login(credentials).then((token) => {
        debugger;
        commit("setToken", token);
        commit("setUser", credentials);
      });
    },
    logout({ commit }) {
      commit("removeToken");
      commit("removeUser");
    },
  },
  plugins: [createPersistedState()],
});

store.subscribe((m, s) => {
  console.log(m);
  console.log(JSON.stringify(s, null, 2));
});
