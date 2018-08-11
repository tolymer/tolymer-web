<template>
  <div class="Cover">
    <slot/>
  </div>
</template>

<style scoped>
.Cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: var(--gradient-cover), url('~assets/images/sticks.jpg');
  background-repeat: no-repeat;
  background-position: 0 0, center bottom;
  background-size: cover;
}
</style>
