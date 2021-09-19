<template>
  <div class="Week">
    <div class="Week__toolbar">
      <button @click="onPrevClick">Prev</button>
      <button @click="onNextClick">Next</button>
    </div>
    <div class="Week__days">
      <WeekDay
        v-for="[date, events] in weekEvents"
        :key="date"
        :events="events"
        class="Week__day"
        @eventClick="handleEventClick"
      />
    </div>
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
  emits: ["eventClick", "prev", "next"],
  setup(props, { emit }) {
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

    const handleEventClick = (eventId: string) => {
      emit("eventClick", eventId);
    };

    const onPrevClick = () => {
      emit("prev");
    };
    const onNextClick = () => {
      emit("next");
    };

    return {
      weekEvents,
      handleEventClick,
      onPrevClick,
      onNextClick,
    };
  },
});
</script>

<style lang="postcss">
.Week {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__toolbar {
    flex: 0 0;
  }

  &__days {
    flex: 1;
    display: flex;
    justify-content: stretch;
  }

  &__day {
    flex: 1 0;
    height: 99%;
  }
}
</style>
