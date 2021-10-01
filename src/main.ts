import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import Notifications from "@kyvg/vue3-notification";
import "./assets/styles/reset.css";
import "./assets/styles/common.css";

createApp(App).use(router).use(store, key).use(Notifications).mount("#app");
