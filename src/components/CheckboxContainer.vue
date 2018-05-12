<template>
  <div class="CheckboxContainer">
    <p class="CheckboxContainer-label">
      <slot name="label"/>
    </p>
    <slot/>
  </div>
</template>

<style scoped>
.CheckboxContainer-label {
  margin-bottom: var(--space-2x);
}
</style>
