<template>
  <p>Authorizing Google...</p>
</template>

<script>
export default {
  async fetch(context) {
    try {
      const { code } = context.query;
      const payload = { code };

      await context.store.dispatch('loginCallback', payload);
    } catch (e) {
      context.error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
};
</script>
