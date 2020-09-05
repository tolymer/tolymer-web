<template>
  <Cover>
    <p class="LoginCallback">
      Authorizing Google...
    </p>
  </Cover>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types'
import { authModule } from '~/store/modules/auth';
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
  async asyncData({ query }: Context) {
    return query;
  },
  async mounted() {
    const authState = authModule.context(this.$store);

    await authState.actions.loginCallback({
      code: this.code,
      state: this.state
    });

    this.$router.push('/');
  }
});
</script>

<style scoped>
.LoginCallback {
  color: var(--color-pale-white);
  text-align: center;
}
</style>
