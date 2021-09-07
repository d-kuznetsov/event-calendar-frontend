<template>
  <div class="Navigation">
    <button v-if="isLoggedIn" @click="handleLogoutClick">Logout</button>
    <button v-else @click="handleLoginClick">Login</button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const handleLoginClick = () => {
      const testUser = {
        name: "Katya",
        password: "12345",
      };
      store.dispatch("login", testUser);
      router.push("/calendar");
    };
    const handleLogoutClick = () => {
      store.dispatch("logout");
      router.push("/login");
    };

    return {
      isLoggedIn,
      handleLoginClick,
      handleLogoutClick,
    };
  },
};
</script>
<style lang="postcss">
.Navigation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding: 8px;
}
</style>
