<template>
  <form action="" class="EntryForm" @submit.prevent="onSubmit">
    <template v-if="hasName">
      <input
        v-model="name"
        class="input w-full"
        type="text"
        placeholder="name"
      />
      <div class="EntryForm__errMessage">
        {{ errors.name }}
      </div>
    </template>
    <input
      v-model="email"
      class="input w-full"
      type="text"
      placeholder="email"
    />
    <div class="EntryForm__errMessage">
      {{ errors.email }}
    </div>
    <input
      v-model="password"
      class="input w-full"
      type="text"
      placeholder="password"
    />
    <div class="EntryForm__errMessage">
      {{ errors.password }}
    </div>
    <button class="EntryForm__submitBtn" type="submit">Ok</button>
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
    color: $clr-error;
    font-size: 11px;
    height: 14px;
  }

  &__submitBtn {
    width: 100%;
    background: $clr-sky-600;
    font-size: 16px;
    color: white;
    font-weight: 500;
    padding: $space-sm $space-md;
    border-radius: $space-md;
    border-color: transparent;

    &:active {
      transform: scale(0.99);
      background: $clr-sky-500;
    }
  }
}
</style>
