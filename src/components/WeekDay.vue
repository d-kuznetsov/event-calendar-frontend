<template>
  <div class="WeekDay">
    <div class="WeekDay__grid">
      <div v-for="h in 24" :key="h" class="WeekDay__gridItem" />
    </div>
    <div class="WeekDay__events" @click="handleClick">
      <div
        v-for="{ event, intersec, leftOffset } in expandedEvents"
        :key="event.id"
        class="WeekDay__eventWrap"
        :style="{
          width: `${100 / (intersec + 1)}%`,
          height: `${getPctOfDur('00:00', event.endTime)}%`,
          left: `${(100 / (intersec + 1)) * leftOffset}%`,
        }"
      >
        <div
          class="WeekDay__event"
          :style="{
            height: `calc(${getPctOfDur(
              event.startTime,
              event.endTime,
              event.endTime
            )}% - 1px)`,
          }"
          :data-event-id="event.id"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Event } from "../store/types";

function toMinutes(timeStr: string) {
  const [h, m] = timeStr.split(":");
  return parseInt(h) * 60 + parseInt(m);
}

function getPctOfDur(start: string, end: string, dur: string = "24:00") {
  const eventDur = toMinutes(end) - toMinutes(start);
  const wholeDur = toMinutes(dur);
  return Math.round((eventDur / wholeDur) * 10000) / 100;
}

export default defineComponent({
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true,
    },
  },
  emits: {
    eventClick(eventId: string) {
      return !!eventId;
    },
  },
  setup(props, { emit }) {
    const expandedEvents = computed(() => {
      const events = props.events.map((event) => {
        return {
          event,
          intersec: 0,
          leftOffset: 0,
        };
      });

      for (let i = 0; i < events.length; i++) {
        for (let j = 0; j < events.length; j++) {
          if (
            i == j ||
            events[j].event.endTime <= events[i].event.startTime ||
            events[j].event.startTime >= events[i].event.endTime
          ) {
            continue;
          }
          events[i].intersec++;
          j < i && events[i].leftOffset++;
        }
      }

      return events.reverse();
    });

    // TODO: Fix event type
    const handleClick = (e: any) => {
      const eventId = e.target?.dataset?.eventId;
      if (eventId) {
        emit("eventClick", eventId);
      }
    };

    return { expandedEvents, getPctOfDur, handleClick };
  },
});
</script>

<style lang="postcss">
.WeekDay {
  display: flex;
  flex-direction: column;
  position: relative;
  border-right: 1px solid #bbb;

  &__grid {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;

    &Item {
      flex: 1;
      border-bottom: 1px solid #ddd;
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
    padding: 0px 1px 1px 1px;
  }

  &__event {
    width: 100%;
    border: 1px solid #2563eb;
    border-radius: 2px;
    background-image: repeating-linear-gradient(
      135deg,
      #60a5fa,
      #60a5fa 5%,
      #3b82f6 5%,
      #3b82f6 10%
    );
    cursor: pointer;
  }
}
</style>
