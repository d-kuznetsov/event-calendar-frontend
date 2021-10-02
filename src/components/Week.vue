<template>
  <div class="Week">
    <div class="Week__dayNames">
      <div class="Week__dayName" v-for="[date] in weekEvents" :key="date">
        {{ getDayName(date) }}
      </div>
    </div>
    <div class="Week__days">
      <div class="Week__times">
        <div v-for="hour in 24" :key="hour" class="Week__time">
          {{ getTimeStrByHour(hour - 1) }}
        </div>
      </div>
      <WeekDay
        v-for="[date, events] in weekEvents"
        :key="date"
        :events="events"
        class="Week__day"
        @eventClick="onEventClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Range, getTimeStrByHour, getDayName } from "../lib/date-helper";
import { Event } from "../store/types";
import WeekDay from "./WeekDay";

interface DateMap {
  [date: string]: Event[];
}

export default defineComponent({
  components: {
    WeekDay,
  },
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true,
    },
    weekStart: {
      type: String,
      required: true,
    },
    weekEnd: {
      type: String,
      required: true,
    },
  },
  emits: ["eventClick"],

  setup(props, { emit }) {
    const weekEvents = computed(() => {
      const weekRange = new Range(props.weekStart, props.weekEnd);
      const dateMap: DateMap = [...weekRange].reduce((acc, date) => {
        return {
          ...acc,
          [date as string]: [],
        };
      }, {});
      props.events.forEach((event) => {
        if (!!dateMap[event.date]) {
          dateMap[event.date].push(event);
        }
      });
      return Object.entries(dateMap);
    });

    const onEventClick = (eventId: string) => {
      emit("eventClick", eventId);
    };

    return {
      weekEvents,
      onEventClick,
      getTimeStrByHour,
      getDayName,
    };
  },
});
</script>

<style lang="postcss">
$time-block-width: 45px;

.Week {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__dayNames {
    flex: 0;
    display: flex;
    justify-content: flex-end;
    padding: 4px 0px 4px $time-block-width;
    border-bottom: 1px solid $color-gray-200;
    font-size: 12px;
    font-weight: 500;
  }

  &__dayName {
    flex: 1;
    text-align: center;
    color: $color-gray-900;
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
    justify-content: stretch;
  }

  &__time {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: $time-block-width;
    border-bottom: 1px solid $color-gray-200;
    border-right: 1px solid $color-gray-300;
    color: $color-gray-500;
    font-size: 11px;
    font-weight: 500;
  }

  &__day {
    flex: 1 0;
    height: 100%;
  }
}
</style>
