<template>
  <div class="App">
    <div class="App__container">
      <div class="App__header">
        <Navigation />
      </div>
      <div class="App__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navigation from "./components/Navigation.vue";

export default {
  components: {
    Navigation,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="postcss">
.App {
  height: 100vh;
  background: #eff6ff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  /*   background: white; */
  /*   background: radial-gradient(#1d4ed8, #1e3a8a); */
  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0 0 10px #374151;
    @media (min-width: $bp-xl) {
      max-width: $bp-xl;
    }
  }

  &__header {
    flex: 0;
    min-height: 75px;
  }

  &__content {
    flex: 1;
    overflow: auto;
    background: white;
  }
}
</style>
