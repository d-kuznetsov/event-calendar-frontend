<template>
  <div class="Calendar">
    <div class="Calendar__toolbar">
      <button class="btn-round" @click="addNewEvent">
        <Add />
      </button>
      <div>
        <button class="btn-round" @click="decrementWeek">
          <Back />
        </button>
        <button class="btn-round ml-sm" @click="incrementWeek">
          <Forward />
        </button>
      </div>
    </div>
    <Week
      :events="events"
      :weekStart="period[0]"
      :weekEnd="period[1]"
      class="Calendar__week"
      @eventClick="editEvent"
    />
    <EventEditor
      v-if="isEditorOpen"
      :event="editableEvent"
      @close="closeEditor"
      @update="onEventUpdate"
      @delete="onEventDelete"
    />
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "../store";
import { Event } from "../store/types";
import Week from "../components/Week.vue";
import EventEditor from "../components/EventEditor.vue";
import Add from "../components/icon-buttons/Add.vue";
import Back from "../components/icon-buttons/Back.vue";
import Forward from "../components/icon-buttons/Forward.vue";

export default {
  components: {
    Week,
    EventEditor,
    Add,
    Back,
    Forward,
  },
  setup() {
    const store = useStore();
    const events = computed(() => store.state.events);
    const period = computed(() => store.state.period);
    const isEditorOpen = ref(false);
    const editableEvent = ref<Event | null>(null);

    watch(period, () => store.dispatch("fetchEvents"), { immediate: true });

    const editEvent = (e: Event) => {
      isEditorOpen.value = true;
      editableEvent.value = { ...e };
    };
    const addNewEvent = () => {
      isEditorOpen.value = true;
      editableEvent.value = {
        date: "",
        startTime: "",
        endTime: "",
        content: "",
      } as Event;
    };
    const closeEditor = () => {
      isEditorOpen.value = false;
      editableEvent.value = null;
    };

    const onEventUpdate = (e: Event) => {
      if (e.id) {
        store.dispatch("updateEvent", e).then(() => {
          store.dispatch("fetchEvents");
          isEditorOpen.value = false;
          editableEvent.value = null;
        });
      } else {
        store.dispatch("createEvent", e).then(() => {
          store.dispatch("fetchEvents");
          isEditorOpen.value = false;
          editableEvent.value = null;
        });
      }
    };
    const onEventDelete = (id: string) => {
      store.dispatch("deleteEvent", id).then(() => {
        store.dispatch("fetchEvents");
        isEditorOpen.value = false;
        editableEvent.value = null;
      });
    };

    const incrementWeek = () => {
      store.commit("incrementWeek");
    };
    const decrementWeek = () => {
      store.commit("decrementWeek");
    };

    return {
      events,
      period,
      isEditorOpen,
      editableEvent,
      editEvent,
      closeEditor,
      addNewEvent,
      onEventUpdate,
      onEventDelete,
      incrementWeek,
      decrementWeek,
    };
  },
};
</script>

<style lang="postcss">
.Calendar {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__toolbar {
    flex: 0 0;
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
  }

  &__week {
    flex: 1;
  }
}
</style>
