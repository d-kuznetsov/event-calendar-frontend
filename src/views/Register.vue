<template>
  <div class="Register">
    <EntryForm
      buttonLabel="Sign Up"
      :isSubmitting="isSubmitting"
      @submit="onSubmit"
      class="mb-lg"
    />
    <router-link to="/login"> Already have an account? Log In. </router-link>
  </div>
</template>

<script lang="ts">
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

    const onSubmit = async (registerData: {}) => {
      try {
        isSubmitting.value = true;
        const isSuccessfully = await store.dispatch("register", registerData);
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
.Register {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}
</style>
