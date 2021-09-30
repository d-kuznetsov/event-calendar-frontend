<template>
  <div class="EventEditor">
    <div class="EventEditor__dialog" ref="parent">
      <div class="EventEditor__toolbar">
        <button v-if="event?.id" class="btn-round" @click="handleDelete">
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
        <div class="flex">
          <div class="flex-1">
            <input
              type="date"
              v-model="date"
              class="input w-full"
              :class="{ 'input-error': dateErr }"
            />
            <div class="EventEditor__errMessage">{{ dateErr }}</div>
          </div>
          <div class="flex-1 ml-sm">
            <input
              type="time"
              v-model="startTime"
              class="input w-full"
              :class="{ 'input-error': startTimeErr }"
            />
            <div class="EventEditor__errMessage">{{ startTimeErr }}</div>
          </div>
          <div class="flex-1 ml-sm">
            <input
              type="time"
              v-model="endTime"
              class="input w-full"
              :class="{ 'input-error': endTimeErr }"
            />
            <div class="EventEditor__errMessage">{{ endTimeErr }}</div>
          </div>
        </div>
        <textarea
          v-model="content"
          class="input"
          :class="{ 'input-error': contentErr }"
          rows="4"
        />
        <div class="EventEditor__errMessage">{{ contentErr }}</div>
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
import { useField } from "vee-validate";
import { string } from "yup";

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
    const { value: date, errorMessage: dateErr } = useField(
      "date",
      string().required(),
      {
        initialValue: props.event?.date,
      }
    );
    const { value: startTime, errorMessage: startTimeErr } = useField(
      "startTime",
      string().required(),
      {
        initialValue: props.event?.startTime,
      }
    );
    const { value: endTime, errorMessage: endTimeErr } = useField(
      "endTime",
      string().required(),
      {
        initialValue: props.event?.endTime,
      }
    );
    const { value: content, errorMessage: contentErr } = useField(
      "content",
      string().required(),
      {
        initialValue: props.event?.content,
      }
    );

    const handleClose = () => {
      emit("close");
    };
    const handleUpdate = () => {
      emit("update", {
        ...props.event,
        date: date.value,
        startTime: startTime.value,
        endTime: endTime.value,
        content: content.value,
      });
    };
    const handleDelete = () => {
      emit("delete", props.event?.id);
    };
    return {
      date,
      dateErr,
      startTime,
      startTimeErr,
      endTime,
      endTimeErr,
      content,
      contentErr,
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
    padding-top: $space-lg;
  }

  &__errMessage {
    display: flex;
    align-items: center;
    color: $clr-error;
    font-size: 11px;
    height: 14px;
  }
}
</style>
