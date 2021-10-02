import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import Notifications from "@kyvg/vue3-notification";

createApp(App).use(router).use(store, key).use(Notifications).mount("#app");
