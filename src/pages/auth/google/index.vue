<script>
export default {
  async fetch(context) {
    try {
      await context.store.dispatch('login');

      context.redirect(301, context.store.state.location);
    } catch (e) {
      context.error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
};
</script>
