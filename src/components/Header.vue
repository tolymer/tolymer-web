<template>
  <header>
    <h1>{{ title || name || "Tolymer" }}</h1>
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

<style>
header {
  padding: calc(var(--space-base) * 2);
  text-align: center;
  color: var(--color-black);
  background-color: var(--color-gray);
  font-weight: bold;
}

header h1 {
  margin: 0;
  font-size: 2rem;
}
</style>
