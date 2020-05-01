<template>
  <p>Redirecting to Google...</p>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types'

export default Vue.extend({
  async fetch({ store, redirect, error }: Context) {
    try {
      await store.dispatch('login');

      redirect(301, store.state.location);
    } catch (e) {
      error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
});
</script>
