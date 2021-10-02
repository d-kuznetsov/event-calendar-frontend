<template>
  <div class="WeekDay">
    <div class="WeekDay__grid">
      <div v-for="hour in 24" :key="hour" class="WeekDay__gridItem" />
    </div>
    <div class="WeekDay__events" @click="onEventClick">
      <div
        v-for="{
          event,
          width,
          offsetLeft,
          eventWrapHeight,
          eventHeight,
        } in enrichedEvents"
        :key="event.id"
        class="WeekDay__eventWrap"
        :style="{
          width: `${width}%`,
          height: `${eventWrapHeight}%`,
          left: `${offsetLeft}%`,
        }"
      >
        <div
          class="WeekDay__event"
          :style="{ height: `calc(${eventHeight}% - 1px)` }"
          :data-event-id="event.id"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { getPercentageOfDur, AreaManager } from "./service";
import { Event } from "../../store/types";

export default defineComponent({
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true,
    },
  },
  emits: ["eventClick"],

  setup(props, { emit }) {
    const enrichedEvents = computed(() => {
      const intersecs = props.events.map((_, i, arr) => {
        let intersec = 0;
        for (let j = 0; j < arr.length; j++) {
          if (
            i == j ||
            arr[j].endTime <= arr[i].startTime ||
            arr[j].startTime >= arr[i].endTime
          ) {
            continue;
          }
          intersec++;
        }
        return intersec;
      });

      const areaMgr = new AreaManager();

      return props.events
        .map((e, idx) => {
          const width = Math.floor(100 / (intersecs[idx] + 1));
          const y1 = getPercentageOfDur("00:00", e.startTime);
          const y2 = getPercentageOfDur("00:00", e.endTime);
          let x1 = 0;
          let x2 = width;

          while (!areaMgr.check(x1, y1, x2, y2)) {
            x1 += width;
            x2 += width;
          }
          areaMgr.add(x1, y1, x2, y2);

          return {
            event: e,
            width: width,
            offsetLeft: x1,
            eventWrapHeight: y2,
            eventHeight: getPercentageOfDur(e.startTime, e.endTime, e.endTime),
          };
        })
        .reverse();
    });

    // TODO: Fix event type
    const onEventClick = (e: any) => {
      const eventId = e.target?.dataset?.eventId;
      if (eventId) {
        const event = props.events.find((e) => e.id === eventId);
        emit("eventClick", event);
      }
    };

    return { enrichedEvents, onEventClick };
  },
});
</script>

<style lang="postcss">
.WeekDay {
  display: flex;
  flex-direction: column;
  position: relative;
  border-right: 1px solid $color-gray-300;

  &:last-child {
    border-right: transparent;
  }

  &__grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;

    &Item {
      flex: 1;
      border-bottom: 1px solid $color-gray-200;
    }
  }

  &__events {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
  }

  &__eventWrap {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1px;
  }

  &__event {
    border: 2px solid $color-amber-500;
    border-radius: 2px;
    background-image: repeating-linear-gradient(
      135deg,
      $color-amber-300,
      $color-amber-300 3%,
      $color-amber-500 3%,
      $color-amber-500 6%
    );
    transition: border-color 0.75s, transform 0.75s;
    cursor: pointer;

    &:hover {
      transform: scale(1.02);
      border-color: $color-amber-700;
    }
  }
}
</style>
