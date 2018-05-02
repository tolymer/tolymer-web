<template>
  <section>
    <div v-if="!isLoggedIn">
      <Header title="tolymer" />
      <FormContainer @submit="onSubmitLogin">
        <BaseButton type="submit">
          Google でログイン
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
import BaseButton from '~/components/BaseButton';

export default {
  middleware: ['auth'],
  components: {
    Header,
    GroupList,
    FormContainer,
    BaseButton
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

      this.$router.push('/auth/google');
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
