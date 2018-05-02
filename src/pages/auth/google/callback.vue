<template>
  <p>Authorizing Google...</p>
</template>

<script>
export default {
  async fetch(context) {
    try {
      const { code, state } = context.query;
      const { cookie } = context.req.headers;
      const payload = { code, state, cookie };

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
