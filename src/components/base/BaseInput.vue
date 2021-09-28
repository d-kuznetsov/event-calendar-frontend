<template>
  <div
    class="BaseInput"
    :class="{
      'BaseInput-focused': isFocused,
      'BaseInput-error': error,
    }"
  >
    <input
      type="text"
      v-model="text"
      class="BaseInput__input"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { useVModel } from "@vueuse/core";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    error: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const text = useVModel(props, "modelValue", emit);
    const isFocused = ref(false);
    const onFocus = () => (isFocused.value = true);
    const onBlur = () => (isFocused.value = false);

    return { text, isFocused, onFocus, onBlur };
  },
});
</script>

<style lang="postcss">
.BaseInput {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: $space-xs;
  border: 2px solid $clr-gray-500;
  border-radius: $space-md;
  background-color: white;

  &-focused {
    border-color: $clr-sky-400;
  }

  &-error {
    border-color: $clr-error;
  }

  &__input {
    flex: 1;
    border: transparent;
    background: transparent;
  }
}
</style>
