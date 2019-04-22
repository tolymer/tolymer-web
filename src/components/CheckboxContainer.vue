<template>
  <div class="CheckboxContainer">
    <p class="CheckboxContainer-label">
      <slot name="label" />
    </p>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>


<style scoped>
.CheckboxContainer-label {
  margin-bottom: var(--space-2x);
}
</style>
