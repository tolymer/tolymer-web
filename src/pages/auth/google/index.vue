<template>
  <p>Redirecting to Google...</p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
});
</script>
