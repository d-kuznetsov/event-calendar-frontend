<template>
  <div>
    Week
    {{ weekEvents }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Event } from "../store/types";

export default defineComponent({
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true,
    },
    startWeek: {
      type: String,
      required: true,
    },
    endWeek: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const weekEvents = computed(() =>
      props.events.filter((e) => {
        return e.date >= props.startWeek && e.date <= props.endWeek;
      })
    );
    return {
      weekEvents,
    };
  },
});
</script>
