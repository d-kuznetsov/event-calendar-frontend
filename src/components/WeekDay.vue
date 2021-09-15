<template>
  <div>
    <div v-for="e in events" :key="e.id">
      {{ e }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Event } from "../store/types";

export default defineComponent({
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
