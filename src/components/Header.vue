<template>
  <header>
    {{ name }}
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
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
</style>
