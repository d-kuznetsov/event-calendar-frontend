<template>
  <div class="Login">
    <EntryForm
      :hasName="false"
      buttonLabel="Log In"
      :isSubmitting="isSubmitting"
      @submit="onSubmit"
      class="mb-lg"
    />
    <router-link to="/register"> Don't have an account? Sign Up. </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import EntryForm from "../components/EntryForm.vue";

export default {
  components: {
    EntryForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isSubmitting = ref(false);

    const onSubmit = async (loginData) => {
      try {
        isSubmitting.value = true;
        const isSuccessfully = await store.dispatch("login", loginData);
        if (isSuccessfully) {
          router.push("/calendar");
        }
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      isSubmitting,
      onSubmit,
    };
  },
};
</script>

<style lang="postcss">
.Login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}
</style>
