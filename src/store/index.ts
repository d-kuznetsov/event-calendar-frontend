import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import service from "./service";

interface User {
  name: string;
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
  },
  plugins: [createPersistedState()],
});

store.subscribe((m, s) => {
  console.log(m);
  console.log(JSON.stringify(s, null, 2));
});
