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
}

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export const store = createStore<State>({
  state() {
    return {
      user: null,
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
  },
  actions: {
    register({ commit }, userData) {
      return service.register(userData).then((user) => {
        commit("setUser", user);
      });
    },
    login({ commit }, credentials) {
      return service.login(credentials).then((user) => {
        commit("setUser", user);
      });
    },
    logout({ commit }) {
      commit("removeUser");
    },
  },
  plugins: [createPersistedState()],
});
