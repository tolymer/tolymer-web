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
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}

.Main {
  padding: var(--space-base);
}
</style>
