<template>
  <div class="Calendar">
    <Week
      :events="events"
      :startWeek="period[0]"
      :endWeek="period[1]"
      class="Calendar__week"
      @eventClick="handleEventClick"
    />
    <EventEditor v-if="isEditorOpen" @click="handleCloseClick" />
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "../store";
import Week from "../components/Week.vue";
import EventEditor from "../components/EventEditor.vue";

export default {
  components: {
    Week,
    EventEditor,
  },
  setup() {
    const store = useStore();
    const events = computed(() => store.state.events);
    const period = computed(() => store.state.period);
    const isEditorOpen = ref(false);
    store.dispatch("fetchEvents");

    const handleEventClick = (eventId: string) => {
      isEditorOpen.value = true;
    };
    const handleCloseClick = () => {
      isEditorOpen.value = false;
    };

    return {
      events,
      period,
      isEditorOpen,
      handleEventClick,
      handleCloseClick,
    };
  },
};
</script>

<style lang="postcss">
.Calendar {
  height: 100%;

  &__week {
    height: 100%;
  }
}
</style>
