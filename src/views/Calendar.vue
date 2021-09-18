<template>
  <div class="Calendar">
    <Week
      :events="events"
      :startWeek="period[0]"
      :endWeek="period[1]"
      class="Calendar__week"
      @eventClick="handleEventClick"
    />
    <EventEditor
      v-if="isEditorOpen"
      :event="editableEvent"
      @close="handleCloseClick"
      @update="update"
    />
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "../store";
import { Event } from "../store/types";
import Week from "../components/Week.vue";
import EventEditor from "../components/EventEditor.vue";

export default {
  components: {
    Week,
    EventEditor,
  },
  setup() {
    const store = useStore();
    const events = computed(() =>
      store.state.events.sort((a, b) => {
        return a.startTime > b.startTime ? 1 : -1;
      })
    );
    const period = computed(() => store.state.period);
    const isEditorOpen = ref(false);
    const editableEvent = ref<Event | null>(null);

    store.dispatch("fetchEvents");

    const handleEventClick = (e: Event) => {
      isEditorOpen.value = true;
      editableEvent.value = { ...e };
    };
    const handleCloseClick = () => {
      isEditorOpen.value = false;
      editableEvent.value = null;
    };
    const update = (e: Event) => {
      store.dispatch("updateEvent", e).then(() => {
        store.dispatch("fetchEvents");
      });
    };

    return {
      events,
      period,
      isEditorOpen,
      editableEvent,
      handleEventClick,
      handleCloseClick,
      update,
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
