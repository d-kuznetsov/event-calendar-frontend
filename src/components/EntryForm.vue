<template>
  <form action="" class="EntryForm" @submit.prevent="onSubmit">
    <template v-if="hasName">
      <input
        v-model.lazy="name"
        class="input w-full"
        :class="{
          'input-error': errors.name,
        }"
        type="text"
        placeholder="name"
      />
      <div class="EntryForm__errMessage">
        {{ errors.name }}
      </div>
    </template>
    <input
      v-model.lazy="email"
      class="input w-full"
      :class="{
        'input-error': errors.email,
      }"
      type="text"
      placeholder="email"
    />
    <div class="EntryForm__errMessage">
      {{ errors.email }}
    </div>
    <input
      v-model.lazy="password"
      class="input w-full"
      :class="{
        'input-error': errors.password,
      }"
      type="password"
      placeholder="password"
    />
    <div class="EntryForm__errMessage">
      {{ errors.password }}
    </div>
    <button :disabled="isSubmitting" class="EntryForm__submitBtn" type="submit">
      {{ buttonLabel }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useForm, useField } from "vee-validate";
import {
  createValidator,
  checkRequiredField,
  checkEmail,
  checkPassword,
} from "../lib/validation-helper";

export default defineComponent({
  props: {
    hasName: {
      type: Boolean,
      default: true,
    },
    buttonLabel: {
      type: String,
      default: "Ok",
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const { handleSubmit, errors } = useForm({
      validationSchema: {
        name: createValidator(props.hasName ? checkRequiredField : () => true),
        email: createValidator(checkRequiredField, checkEmail),
        password: createValidator(checkRequiredField, checkPassword),
      },
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
    });

    const { value: name } = useField("name");
    const { value: email } = useField("email");
    const { value: password } = useField("password");

    const onSubmit = handleSubmit(() => {
      emit("submit", {
        name: name.value,
        email: email.value,
        password: password.value,
      });
    });

    return {
      name,
      email,
      password,
      errors,
      onSubmit,
    };
  },
});
</script>

<style lang="postcss">
.EntryForm {
  width: 360px;

  &__errMessage {
    color: $color-error;
    font-size: 11px;
    height: 14px;
  }

  &__submitBtn {
    width: 100%;
    background: $color-sky-600;
    font-size: 16px;
    color: white;
    font-weight: 500;
    padding: $space-sm $space-md;
    border-radius: $space-md;
    border-color: transparent;

    &:active {
      transform: scale(0.99);
      background: $color-sky-500;
    }

    &:disabled {
      background-image: repeating-linear-gradient(
        135deg,
        $color-sky-300,
        $color-sky-300 5%,
        $color-sky-500 5%,
        $color-sky-500 10%
      );
      border-color: $color-sky-700;
      transform: scale(0.99);
    }
  }
}
</style>
