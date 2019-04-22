<template>
  <Cover>
    <p class="LoginCallback">Authorizing Google...</p>
  </Cover>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/vue-app/types';
import Cover from '~/components/Cover.vue';

export default Vue.extend({
  components: {
    Cover
  },
  data() {
    return {
      code: null,
      state: null
    };
  },
  async asyncData(context: Context) {
    return context.query;
  },
  async mounted() {
    const { code, state } = this;
    const payload = { code, state };

    await this.$store.dispatch('loginCallback', payload);

    this.$router.push('/');
  }
});
</script>

<style scoped>
.LoginCallback {
  text-align: center;
  color: var(--color-pale-white);
}
</style>
