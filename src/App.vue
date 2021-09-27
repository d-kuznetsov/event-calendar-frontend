<template>
  <div class="App">
    <div class="App__container">
      <div class="App__header">
        <Header />
      </div>
      <div class="App__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="postcss">
.App {
  height: 100vh;
  background: #f0f9ff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0 0 10px #0c4a6e;
    @media (min-width: $bp-xl) {
      max-width: $bp-xl;
    }
  }

  &__header {
    flex: 0;
    min-height: 50px;
    background: radial-gradient(#0ea5e9, #075985);
  }

  &__content {
    flex: 1;
    overflow: auto;
    background: white;
  }
}
</style>
