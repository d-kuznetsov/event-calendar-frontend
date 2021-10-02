import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Calendar from "../views/Calendar.vue";

const isAuthenticated = () => {
  return store.getters.isLoggedIn;
};

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/calendar",
    component: Calendar,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth) {
    isAuthenticated() ? next() : next("/login");
  } else {
    isAuthenticated() ? next("/calendar") : next();
  }
});

export default router;
