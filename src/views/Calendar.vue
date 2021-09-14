<template>
  <div>
    Calendar
    {{ events }}
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "../store";

export default {
  setup() {
    const store = useStore();
    const events = computed(() => store.state.events);
    store.dispatch("fetchEvents");

    return {
      events,
    };
  },
};
</script>
