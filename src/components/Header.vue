<template>
  <header>
    <h1>
      <router-link
        class="Title"
        to="/">
        Tolymer
      </router-link>
    </h1>
  </header>
</template>

<style>
header {
  padding: var(--space-base) calc(var(--space-base) * 2);
  color: var(--color-white);
  background-color: var(--color-black);
}

.Title {
  color: var(--color-white);
}
</style>
