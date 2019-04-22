<template>
  <section>
    <h2>{{ $store.state.user.name }}</h2>
    <p>id: {{ $store.state.user.id }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/vue-app/types';

export default Vue.extend({
  middleware: ['auth'],
  async fetch(context: Context) {
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
