<template>
  <section>
    <h2>{{ $store.state.user.name }}</h2>
    <p>id: {{ $store.state.user.id }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';

export default Vue.extend({
  middleware: ['auth'],
  async fetch({ params, store, error }: Context) {
    try {
      await store.dispatch('user/getUser', {
        userId: params.userId
      });
    } catch (e) {
      error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
});
</script>
