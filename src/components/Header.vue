<template>
  <header class="Header">
    <h1 class="Header-title">
      {{ title || $store.state.name || "Tolymer" }}
    </h1>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
});
</script>

<style scoped>
.Header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-image: var(--gradient-cover);
}

.Header-title {
  color: var(--color-pale-white);
  font-size: var(--font-size-lg);
  font-weight: bold;
  text-align: center;
}
</style>
