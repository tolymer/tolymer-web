<template>
  <form
    class="FormContainer"
    @submit="onSubmit">
    <slot />
  </form>
</template>

<script>
export default {
  methods: {
    onSubmit(e) {
      this.$emit('submit', e);
    }
  }
}
</script>


<style>
.FormContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--space-base) * 2);
}

.FormContainer > * {
  margin: calc(var(--space-base) * 2) auto;
}
</style>
