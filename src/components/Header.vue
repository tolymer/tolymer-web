<template>
  <header class="Header">
    <h1 class="Header-title">{{ title || name || "Tolymer" }}</h1>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: mapState({
    name: state => state.name
  })
};
</script>

<style scoped>
.Header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  background-image: var(--gradient-cover);
}

.Header-title {
  text-align: center;
  font-weight: bold;
  font-size: var(--font-size-lg);
  color: var(--color-pale-white);
}
</style>
