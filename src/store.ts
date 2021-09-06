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
});
