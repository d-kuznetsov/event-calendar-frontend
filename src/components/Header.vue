<template>
  <div class="Header">
    <button v-if="isLoggedIn" class="btn-round" @click="logout">
      <Logout />
    </button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import Logout from "./icon-buttons/Logout.vue";

export default {
  components: {
    Logout,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const logout = () => {
      store.dispatch("logout");
      router.push("/login");
    };

    return {
      isLoggedIn,
      logout,
    };
  },
};
</script>
<style lang="postcss">
.Header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding: 4px 8px;
}
</style>
