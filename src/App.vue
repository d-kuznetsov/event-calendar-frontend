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
};
</script>

<style lang="postcss">
.App {
  height: 100vh;
  background: $clr-sky-50;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0 0 10px $clr-gray-900;

    @media (min-width: $bp-xl) {
      max-width: $bp-xl;
    }
  }

  &__header {
    flex: 0;
    min-height: 50px;
    background: radial-gradient($clr-sky-500, $clr-sky-900);
  }

  &__content {
    flex: 1;
    overflow: auto;
    background: white;
  }
}
</style>
