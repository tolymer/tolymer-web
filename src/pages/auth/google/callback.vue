<template>
  <p>Authorizing Google...</p>
</template>

<script>
export default {
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
