import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

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
    register({ commit }, user) {
      commit("setUser", user);
    },
    login({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("removeUser");
    },
  },
});
