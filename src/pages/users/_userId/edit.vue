<template>
  <section>
    <Header/>
    <FormContainer @submit="onSubmit">
      <BaseInput
        v-model="name"
        type="text"
        label="名前"/>
      <BaseInput
        v-model="password"
        type="password"
        label="パスワード"/>
      <BaseButton type="submit">
        更新
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script>
import { parse } from 'cookie';
import Header from '~/components/Header';
import FormContainer from '~/components/FormContainer';
import BaseInput from '~/components/BaseInput';
import BaseButton from '~/components/BaseButton';

export default {
  components: {
    Header,
    FormContainer,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      userId: '',
      name: '',
      password: ''
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const { accessToken } = parse(document.cookie);
      const { name, password } = this;

      await this.$store.dispatch('user/updateUser', {
        name,
        password
      });

      this.name = '';
      this.password = '';

      await this.$store.dispatch('getCurrentUser', {
        accessToken
      });
    }
  },
  async asyncData(context) {
    const { accessToken } = context.cookie;
    const { userId } = context.params;

    await context.store.dispatch('user/getUser', {
      accessToken,
      userId
    });

    const { name, password } = context.store.state.user;

    return {
      userId,
      name,
      password
    };
  }
};
</script>
