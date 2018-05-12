<template>
  <div class="Cover">
    <slot/>
  </div>
</template>

<script>
export default {};
</script>

<style>
.Cover {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-image: var(--gradient-cover), url('~assets/images/sticks.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0, center bottom;
}
</style>
