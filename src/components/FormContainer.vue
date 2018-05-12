<template>
  <form
    class="FormContainer"
    @submit="onSubmit">
    <slot/>
    <div class="FormContainer-action">
      <slot name="action"/>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    onSubmit(e) {
      this.$emit('submit', e);
    }
  }
};
</script>

<style>
.FormContainer {
  padding: var(--space-4x);
}

.FormContainer > * {
  margin-bottom: var(--space-4x);
}

.FormContainer-action {
  margin-top: var(--space-8x);
}
</style>
