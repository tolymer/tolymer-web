<template>
  <Cover>
    <p class="LoginCallback">Authorizing Google...</p>
  </Cover>
</template>

<script>
import Cover from '~/components/Cover';

export default {
  components: {
    Cover
  },
  async asyncData(context) {
    const { code, state } = context.query;

    return { code, state };
  },
  async mounted() {
    const { code, state } = this;
    const payload = { code, state };

    await this.$store.dispatch('loginCallback', payload);

    this.$router.push('/');
  }
};
</script>

<style scoped>
.LoginCallback {
  text-align: center;
  color: var(--color-pale-white);
}
</style>
