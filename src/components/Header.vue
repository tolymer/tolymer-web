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
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-image: var(--gradient-cover);
}

.Header-title {
  text-align: center;
  color: var(--color-pale-white);
  font-size: var(--font-size-lg);
  font-weight: bold;
}
</style>
