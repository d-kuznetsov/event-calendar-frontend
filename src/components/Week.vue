<template>
  <div class="Week">
    <div class="Week__toolbar">
      <div class="Week__dayNames flex">
        <div
          class="flex-1 Week__dayName"
          v-for="[date] in weekEvents"
          :key="date"
        >
          {{ getDayName(date) }}
        </div>
      </div>
    </div>
    <div class="Week__days">
      <div class="Week__times">
        <div v-for="h in 24" :key="h" class="Week__timesItem">
          {{ getTimeStrByHour(h - 1) }}
        </div>
      </div>
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
import { Range, getTimeStrByHour, getDayName } from "../lib/date-helper";
import WeekDay from "./WeekDay";

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
  emits: ["eventClick"],
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

    return {
      weekEvents,
      handleEventClick,
      getTimeStrByHour,
      getDayName,
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__dayNames {
    border-bottom: 1px solid #ccc;
    padding: 4px 0px 4px 40px;
    font-size: 12px;
    font-weight: 500;
  }

  &__dayName {
    display: flex;
    justify-content: center;
  }

  &__days {
    flex: 1;
    display: flex;
    justify-content: stretch;
  }

  &__times {
    flex: 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &Item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ddd;
      font-size: 12px;
      border-right: 1px solid #bbb;
      font-weight: 500;
      color: #777;
      width: 40px;
    }
  }

  &__day {
    flex: 1 0;
    height: 100%;
  }
}
</style>
