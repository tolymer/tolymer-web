<template>
  <section>
    <Header/>
    <FormContainer @submit="onSubmit">
      <BaseInput
        v-model="name"
        type="text"
        label="名前"/>
      <!--
      <BaseInput
        v-model="password"
        type="password"
        label="パスワード"/>
      -->
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

<script>
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
      password,
      accessToken
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const { name, password, accessToken } = this;

      await this.$store.dispatch('user/updateUser', {
        name,
        password,
        accessToken
      });

      this.$router.push('/');
    }
  }
};
</script>
