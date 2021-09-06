<template>
  <div class="Navigation">
    <button v-if="isLoggedIn">Logout</button>
    <button v-else>Logout</button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "../store";

export default {
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => !!store.state.user);
    return {
      isLoggedIn,
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
