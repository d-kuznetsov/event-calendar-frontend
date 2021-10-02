<template>
  <div class="EventEditor">
    <div class="EventEditor__dialog" ref="parent">
      <div class="EventEditor__toolbar">
        <button class="btn-round" :disabled="isSubmitting" @click="onUpdate">
          <IconDone />
        </button>
        <button
          v-if="event?.id"
          :disabled="isSubmitting"
          class="btn-round ml-sm"
          @click="onDelete"
        >
          <IconDelete />
        </button>
        <button class="btn-round ml-sm" @click="onClose">
          <IconClose />
        </button>
      </div>
      <div class="EventEditor__content">
        <div class="flex">
          <div class="flex-1">
            <input
              type="date"
              v-model="date"
              class="input w-full"
              :class="{ 'input-error': errors.date }"
            />
            <div class="EventEditor__errMessage">{{ errors.date }}</div>
          </div>
          <div class="flex-1 ml-sm">
            <input
              type="time"
              v-model="startTime"
              class="input w-full"
              :class="{ 'input-error': errors.startTime }"
            />
            <div class="EventEditor__errMessage">{{ errors.startTime }}</div>
          </div>
          <div class="flex-1 ml-sm">
            <input
              type="time"
              v-model="endTime"
              class="input w-full"
              :class="{ 'input-error': errors.endTime }"
            />
            <div class="EventEditor__errMessage">{{ errors.endTime }}</div>
          </div>
        </div>
        <textarea
          v-model="content"
          class="input"
          :class="{ 'input-error': errors.content }"
          rows="4"
        />
        <div class="EventEditor__errMessage">{{ errors.content }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useField, useForm } from "vee-validate";
import { Event } from "../store/types";
import IconClose from "../components/icons/IconClose.vue";
import IconDelete from "../components/icons/IconDelete.vue";
import IconDone from "../components/icons/IconDone.vue";

interface ValidCtx {
  form: {
    startTime: string;
    endTime: string;
  };
}

function checkRequiredField(val: string) {
  return val && val.trim() != "" ? true : "Field is required";
}

export default defineComponent({
  components: {
    IconClose,
    IconDone,
    IconDelete,
  },
  props: {
    event: {
      type: Object as PropType<Event | null>,
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close", "update", "delete"],

  setup(props, { emit }) {
    const { handleSubmit, errors } = useForm({
      validationSchema: {
        date: checkRequiredField,
        startTime(startTime: string, { form: { endTime } }: ValidCtx) {
          let result = checkRequiredField(startTime);
          if (typeof result == "string") {
            return result;
          }
          if (
            checkRequiredField(endTime as string) === true &&
            (endTime as string) < startTime
          ) {
            return "Invalid time range";
          }
          return true;
        },
        endTime(endTime: string, { form: { startTime } }: ValidCtx) {
          let result = checkRequiredField(endTime);
          if (typeof result == "string") {
            return result;
          }
          if (
            checkRequiredField(startTime as string) === true &&
            (startTime as string) >= endTime
          ) {
            return "Invalid time range";
          }
          return true;
        },
        content: checkRequiredField,
      },
      initialValues: {
        date: props.event?.date,
        startTime: props.event?.startTime,
        endTime: props.event?.endTime,
        content: props.event?.content,
      },
    });

    const { value: date } = useField<string>("date");
    const { value: startTime } = useField<string>("startTime");
    const { value: endTime } = useField<string>("endTime");
    const { value: content } = useField<string>("content");

    const onClose = () => {
      emit("close");
    };
    const onDelete = () => {
      emit("delete", props.event?.id);
    };
    const onUpdate = handleSubmit(() => {
      emit("update", {
        ...props.event,
        date: date.value,
        startTime: startTime.value,
        endTime: endTime.value,
        content: content.value,
      });
    });

    return {
      date,
      startTime,
      endTime,
      content,
      errors,
      onClose,
      onDelete,
      onUpdate,
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
    background-color: $color-amber-50;
    border-radius: $space-md;
    overflow: auto;
  }

  &__toolbar {
    display: flex;
    justify-content: flex-end;
    border-bottom: 2px solid $color-gray-300;
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
    color: $color-error;
    font-size: 11px;
    height: 14px;
  }
}
</style>
