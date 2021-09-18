<template>
  <div class="EventEditor">
    <div class="EventEditor__dialog">
      <div class="EventEditor__toolbar">
        <button @click="handleClose">Close</button>
      </div>
      <div class="EventEditor__content">Content</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["close"],
  setup(_, { emit }) {
    const handleClose = () => {
      emit("close");
    };
    return {
      handleClose,
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
    padding: 8px;
  }
}
</style>
