<template>
  <div>
    Calendar
    <Week :events="events" :startWeek="period[0]" :endWeek="period[1]" />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "../store";
import Week from "../components/Week.vue";

export default {
  components: {
    Week,
  },
  setup() {
    const store = useStore();
    const events = computed(() => store.state.events);
    const period = computed(() => store.state.period);
    store.dispatch("fetchEvents");
    return {
      events,
      period,
    };
  },
};
</script>
