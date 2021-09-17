<template>
  <div class="Week">
    <WeekDay
      v-for="[date, events] in weekEvents"
      :key="date"
      :events="events"
      class="Week__day"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Event } from "../store/types";
import { Range } from "../lib/date-helper";
import WeekDay from "./WeekDay.vue";

export default defineComponent({
  components: {
    WeekDay,
  },
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
    const weekEvents = computed(() => {
      const range = new Range(props.startWeek, props.endWeek);
      const dateMap: { [idx: string]: Event[] } = [...range].reduce(
        (acc, d) => {
          return {
            ...acc,
            [d as string]: [],
          };
        },
        {}
      );
      props.events.forEach((e) => {
        if (!!dateMap[e.date]) {
          dateMap[e.date].push(e);
        }
      });
      return Object.entries(dateMap);
    });
    return {
      weekEvents,
    };
  },
});
</script>

<style lang="postcss">
.Week {
  display: flex;
  justify-content: stretch;
  height: 100%;

  &__day {
    flex: 1 0;
    height: 99%;
  }
}
</style>
