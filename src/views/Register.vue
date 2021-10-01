<template>
  <div class="Register">
    <EntryForm @submit="onSubmit" class="mb-lg" />
    <router-link to="/login"> Already have an account? Login. </router-link>
  </div>
</template>

<script>
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

    const onSubmit = async (registerData) => {
      const isSuccessfully = await store.dispatch("register", registerData);
      if (isSuccessfully) {
        router.push("/calendar");
      }
    };

    return {
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
