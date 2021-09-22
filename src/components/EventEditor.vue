<template>
  <div class="EventEditor">
    <div class="EventEditor__dialog">
      <div class="EventEditor__toolbar">
        <div class="EventEditor__iconWrap">
          <Delete
            @click="handleDelete"
            class="color-main"
            :width="iconSize"
            :height="iconSize"
          />
        </div>
        <div class="EventEditor__iconWrap">
          <Done
            @click="handleUpdate"
            class="color-main"
            :width="iconSize"
            :height="iconSize"
          />
        </div>
        <div class="EventEditor__iconWrap">
          <Close
            @click="handleClose"
            class="color-main"
            :width="iconSize"
            :height="iconSize"
          />
        </div>
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
    padding: 8px;
    background-color: #fffbeb;
    border-radius: 8px;
    overflow: hidden;
  }

  &__toolbar {
    display: flex;
    justify-content: flex-end;
    border-bottom: 2px solid #ccc;
    padding: 8px 0px;
  }

  &__iconWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #bfdbfe;
    border-radius: 50%;
    height: 36px;
    width: 36px;
    margin-left: 4px;
    cursor: pointer;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 8px 0px;
  }
}
</style>
