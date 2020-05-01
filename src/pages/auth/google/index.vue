<template>
  <p>Redirecting to Google...</p>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import { authModule } from '~/store/modules/auth';

export default Vue.extend({
  async fetch({ store, redirect, error }: Context) {
    try {
      const authState = authModule.context(store);
      await authState.actions.login();

      redirect(301, authState.getters.location);
    } catch (e) {
      error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
});
</script>
