<template>
  <div class="Login">
    <EntryForm :hasName="false" @submit="onSubmit" class="mb-lg" />
    <router-link to="/register"> Don't have an account? Register. </router-link>
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

    const onSubmit = async (loginData) => {
      const isSuccessfully = await store.dispatch("login", loginData);
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
.Login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}
</style>
