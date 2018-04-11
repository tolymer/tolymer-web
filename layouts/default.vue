<template>
  <main>
    <Header />
    <nuxt class="Main" />
    <Footer />
  </main>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
main {
  margin: 0 auto;
  min-width: 320px;
  max-width: 640px;
}

.Main {
  padding: var(--space-base);
}
</style>
