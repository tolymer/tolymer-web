<template>
  <section>
    <Header/>
    <FormContainer @submit.prevent="onSubmit">
      <BaseInput
        v-model="name"
        type="text"
        label="名前"/>
      <div slot="action">
        <BaseButton
          type="submit"
          kind="primary">
          更新
        </BaseButton>
      </div>
    </FormContainer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
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
      userId: null,
      name: null,
      accessToken: null
    };
  },
  async asyncData(context) {
    const { accessToken } = context.cookie;
    const { userId } = context.params;

    await context.store.dispatch('user/getUser', {
      accessToken,
      userId
    });

    const { name } = context.store.state.user;

    return {
      userId,
      name,
      accessToken
    };
  },
  methods: {
    async onSubmit() {
      const { userId, name, accessToken } = this;

      await this.$store.dispatch('user/updateUser', {
        userId,
        name,
        accessToken
      });

      this.$router.push('/');
    }
  }
});
</script>
