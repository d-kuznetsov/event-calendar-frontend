<template>
  <div class="EventEditor">
    <div class="EventEditor__dialog">
      <div class="EventEditor__toolbar">
        <button @click="handleDelete">Delete</button>
        <button @click="handleUpdate">Update</button>
        <button @click="handleClose">Close</button>
      </div>
      <div class="EventEditor__content">
        <div class="flex mb-md">
          <input type="date" v-model="date" class="flex-1" />
          <input type="time" v-model="startTime" class="flex-1 mx-sm" />
          <input type="time" v-model="endTime" class="flex-1" />
        </div>
        <textarea v-model="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { Event } from "../store/types";

export default defineComponent({
  props: {
    event: {
      type: Object as PropType<Event>,
    },
  },
  emits: ["close", "update", "delete"],
  setup(props, { emit }) {
    const editableEvent = reactive({ ...props.event });
    const handleClose = () => {
      emit("close");
    };
    const handleUpdate = () => {
      emit("update", { ...editableEvent });
    };
    const handleDelete = () => {
      emit("delete", editableEvent.id);
    };
    return {
      ...toRefs(editableEvent),
      handleClose,
      handleUpdate,
      handleDelete,
    };
  },
});
</script>

<style lang="postcss">
.EventEditor {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;

  &__dialog {
    width: 640px;
    background-color: #fffbeb;
    border-radius: 8px;
    overflow: hidden;
  }
  &__toolbar {
    background-color: #10b981;
    padding: 8px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    padding: 8px;
  }
}
</style>
