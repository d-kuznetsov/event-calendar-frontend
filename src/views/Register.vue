<template>
  <div class="Register">
    <form class="Register__form" @submit.prevent="handleSubmit">
      <label for="name" class="mb-sm"> Name: </label>
      <input v-model="name" name="name" class="mb-md" />

      <label for="email" class="mb-sm"> Email: </label>
      <input v-model="email" type="email" name="email" class="mb-md" />

      <label for="password" class="mb-sm"> Password: </label>
      <input v-model="password" type="password" name="password" class="mb-md" />

      <button type="submit" class="mb-md">Register</button>

      <p class="mb-md">{{ error }}</p>

      <router-link to="/login"> Already have an account? Login. </router-link>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      name: "",
      email: "",
      password: "",
      error: null,
    });
    const handleSubmit = () => {
      const { name, email, password } = state;
      store.dispatch("register", { name, email, password }).then(() => {
        router.push("/calendar");
      });
    };

    return {
      ...toRefs(state),
      handleSubmit,
    };
  },
};
</script>

<style lang="postcss">
.Register {
  display: flex;
  justify-content: center;

  &__form {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
  }
}
</style>
