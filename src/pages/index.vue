<template>
  <section>
    <div v-if="!isLoggedIn">
      <Header title="tolymer" />
      <FormContainer @submit="onSubmitLogin">
        <BaseInput
          v-model="name"
          label="ログインID"/>
        <BaseInput
          v-model="password"
          type="password"
          label="パスワード"/>
        <BaseButton type="submit">
          ログイン
        </BaseButton>
      </FormContainer>
    </div>
    <div v-if="isLoggedIn">
      <Header />
      <GroupList :groups="groups"/>
      <FormContainer>
        <BaseButton
          kind="bordered"
          @click="onClickCreateGroup">
          グループをつくる
        </BaseButton>
        <BaseButton
          kind="bordered"
          @click="onClickUpdateUser">
          プロフィールを更新する
        </BaseButton>
        <BaseButton
          kind="bordered"
          @click="onClickLogout">
          ログアウト
        </BaseButton>
      </FormContainer>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Header from '~/components/Header';
import GroupList from '~/components/GroupList';
import FormContainer from '~/components/FormContainer';
import BaseInput from '~/components/BaseInput';
import BaseButton from '~/components/BaseButton';

export default {
  middleware: ['auth'],
  components: {
    Header,
    GroupList,
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
  async asyncData(context) {
    const { accessToken } = context.cookie;

    return {
      accessToken
    };
  },
  computed: mapState({
    isLoggedIn: state => state.isLoggedIn,
    id: state => state.id,
    groups: state => state.groups
  }),
  methods: {
    async onSubmitLogin(e) {
      e.preventDefault();

      const {
        name,
        password
      } = this;

      await this.$store.dispatch('login', {
        name,
        password
      });

      this.name = '';
      this.password = '';

      const { accessToken } = this;

      await this.$store.dispatch('getCurrentUser', {
        accessToken
      });
    },
    async onClickCreateGroup() {
      this.$router.push('/groups/new');
    },
    async onClickUpdateUser() {
      this.$router.push(`/users/${this.id}/edit`);
    },
    async onClickLogout(e) {
      e.preventDefault();

      document.cookie = 'accessToken=; max-age=0';

      await this.$store.dispatch('logout');
      await this.$store.dispatch('deleteCurrentUser');
    }
  }
};
</script>
