<template>
  <section>
    <h2>{{ name }}</h2>
    <p>id: {{ id }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import { userModule, userMapper } from '~/store/modules/user';

export default Vue.extend({
  middleware: ['auth'],
  computed: {
    ...userMapper.mapGetters(['id', 'name'])
  },
  async fetch({ params, store, error }: Context) {
    try {
      const userState = userModule.context(store);
      await userState.actions.getUser({ userId: params.userId });
    } catch (e) {
      error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
});
</script>
