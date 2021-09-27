<template>
  <div class="Calendar">
    <div class="Calendar__toolbar">
      <button class="Calendar__createEvent btn-round" @click="create">
        <Add />
      </button>
      <div class="flex">
        <button class="btn-round" @click="onPrev">
          <Back />
        </button>
        <button class="btn-round ml-sm" @click="onNext">
          <Forward />
        </button>
      </div>
    </div>
    <Week
      :events="events"
      :weekStart="period[0]"
      :weekEnd="period[1]"
      class="Calendar__week"
      @eventClick="handleEventClick"
      @prev="onPrev"
      @next="onNext"
    />
    <EventEditor
      v-if="isEditorOpen"
      :event="editableEvent"
      @close="handleCloseClick"
      @update="update"
      @delete="handleDelete"
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
    const events = computed(() =>
      store.state.events.sort((a, b) => {
        return a.startTime > b.startTime ? 1 : -1;
      })
    );
    const period = computed(() => store.state.period);
    const isEditorOpen = ref(false);
    const editableEvent = ref<Event | null>(null);

    watch(period, () => store.dispatch("fetchEvents"), { immediate: true });

    const handleEventClick = (e: Event) => {
      isEditorOpen.value = true;
      editableEvent.value = { ...e };
    };
    const handleCloseClick = () => {
      isEditorOpen.value = false;
      editableEvent.value = null;
    };
    const update = (e: Event) => {
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

    const create = () => {
      isEditorOpen.value = true;
      editableEvent.value = {
        date: "",
        startTime: "",
        endTime: "",
        content: "",
      } as Event;
    };

    const handleDelete = (id: string) => {
      store.dispatch("deleteEvent", id).then(() => {
        store.dispatch("fetchEvents");
        isEditorOpen.value = false;
        editableEvent.value = null;
      });
    };

    const onNext = () => {
      store.commit("incrementWeek");
    };
    const onPrev = () => {
      store.commit("decrementWeek");
    };

    return {
      events,
      period,
      isEditorOpen,
      editableEvent,
      handleEventClick,
      handleCloseClick,
      update,
      create,
      handleDelete,
      onNext,
      onPrev,
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
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
  }

  &__week {
    flex: 1;
  }
}
</style>
