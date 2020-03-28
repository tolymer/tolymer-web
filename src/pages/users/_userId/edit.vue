<template>
  <section>
    <Header />
    <FormContainer @submit.prevent="onSubmit">
      <BaseInput
        v-model="name"
        type="text"
        label="名前"
      />
      <div slot="action">
        <BaseButton
          type="submit"
          kind="primary"
        >
          更新
        </BaseButton>
      </div>
    </FormContainer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import Header from '~/components/Header.vue';
import FormContainer from '~/components/FormContainer.vue';
import BaseInput from '~/components/BaseInput.vue';
import BaseButton from '~/components/BaseButton.vue';

export default Vue.extend({
  components: {
    Header,
    FormContainer,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      name: null
    };
  },
  async asyncData({ params, store }: Context) {
    await store.dispatch('user/getUser', {
      userId: params.userId
    });

    const { name } = store.state.user;

    return {
      name
    };
  },
  methods: {
    async onSubmit() {
      const { name } = this;
      const { userId } = this.$route.params;

      await this.$store.dispatch('user/updateUser', {
        userId,
        name
      });

      this.$router.push('/');
    }
  }
});
</script>
