<template>
  <section>
    <h2>{{ $store.state.user.name }}</h2>
    <p>id: {{ $store.state.user.id }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  middleware: ['auth'],
  async fetch(context) {
    try {
      const { userId } = context.params;

      await context.store.dispatch('user/getUser', {
        userId
      });
    } catch (e) {
      context.error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
});
</script>
