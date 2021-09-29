<template>
  <div class="EventEditor">
    <div class="EventEditor__dialog" ref="parent">
      <div class="EventEditor__toolbar">
        <button class="btn-round" @click="handleDelete">
          <Delete />
        </button>
        <button class="btn-round ml-sm" @click="handleUpdate">
          <Done />
        </button>
        <button class="btn-round ml-sm" @click="handleClose">
          <Close />
        </button>
      </div>
      <div class="EventEditor__content">
        <div class="flex mb-md">
          <input type="date" v-model="date" class="flex-1 input" />
          <input type="time" v-model="startTime" class="flex-1 mx-sm input" />
          <input type="time" v-model="endTime" class="flex-1 input" />
        </div>
        <textarea v-model="content" class="input" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, ref } from "vue";
import Close from "../components/icon-buttons/Close.vue";
import Delete from "../components/icon-buttons/Delete.vue";
import Done from "../components/icon-buttons/Done.vue";
import { Event } from "../store/types";

export default defineComponent({
  components: {
    Close,
    Done,
    Delete,
  },
  props: {
    event: {
      type: Object as PropType<Event>,
    },
  },
  emits: ["close", "update", "delete"],
  setup(props, { emit }) {
    const editableEvent = reactive({ ...props.event });
    const iconSize = "24px";
    const text = ref("text");
    const parent = ref(null);

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
      iconSize,
      handleClose,
      handleUpdate,
      handleDelete,
      text,
      parent,
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
    padding: 0 $space-md;
    background-color: $clr-amber-50;
    border-radius: $space-md;
    overflow: auto;
  }

  &__toolbar {
    display: flex;
    justify-content: flex-end;
    border-bottom: 2px solid $clr-gray-300;
    padding: $space-md 0px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: $space-lg 0px;
  }
}
</style>
