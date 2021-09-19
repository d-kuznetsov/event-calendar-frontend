<template>
  <div class="WeekDay">
    <div class="WeekDay__grid">
      <div v-for="h in 24" :key="h" class="WeekDay__gridItem" />
    </div>
    <div class="WeekDay__events" @click="handleClick">
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

class AreaManager {
  readonly height: number;
  readonly width: number;
  readonly coordList: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }>;

  constructor(h: number = 100, w: number = 100) {
    this.height = h;
    this.width = w;
    this.coordList = [];
  }

  add(x1: number, y1: number, x2: number, y2: number) {
    this.coordList.push({
      x1,
      y1,
      x2,
      y2,
    });
  }

  check(candX1: number, candY1: number, candX2: number, candY2: number) {
    return this.coordList.every(({ x1, x2, y1, y2 }) => {
      return candY2 <= y1 || candY1 >= y2 || candX1 >= x2 || candX2 <= x1;
    });
  }
}

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
          const y1 = getPctOfDur("00:00", e.startTime);
          const y2 = getPctOfDur("00:00", e.endTime);
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
            eventHeight: getPctOfDur(e.startTime, e.endTime, e.endTime),
          };
        })
        .reverse();
    });

    // TODO: Fix event type
    const handleClick = (e: any) => {
      const eventId = e.target?.dataset?.eventId;
      if (eventId) {
        const event = props.events.find((e) => e.id === eventId);
        emit("eventClick", event);
      }
    };

    return { enrichedEvents, handleClick };
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
