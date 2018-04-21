<template>
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
      登録
    </BaseButton>
  </FormContainer>
</template>

<script>
import { mapState } from 'vuex';
import { parse } from 'cookie';
import FormContainer from '~/components/FormContainer';
import BaseInput from '~/components/BaseInput';
import BaseButton from '~/components/BaseButton';

export default {
  components: {
    FormContainer,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      name: '',
      password: ''
    };
  },
  computed: mapState({
    isLoggedIn: state => state.isLoggedIn
  }),
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const {
        name,
        password
      } = this;

      await this.$store.dispatch('user/createUser', {
        name,
        password
      });

      await this.$store.dispatch('login', {
        name,
        password
      });

      this.name = '';
      this.password = '';

      const { accessToken } = parse(document.cookie);

      await this.$store.dispatch('getCurrentUser', {
        accessToken
      });
    }
  }
};
</script>
