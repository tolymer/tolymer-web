<template>
  <section>
    <div v-if="!isLoggedIn">
      <Cover>
        <h1 class="AppName">
          Tolymer
        </h1>
        <FormContainer @submit="onSubmitLogin">
          <BaseButton
            kind="normal"
            type="submit">
            <GoogleIcon slot="icon"/>
            Googleアカウントでサインイン
          </BaseButton>
        </FormContainer>
      </Cover>
    </div>
    <div v-if="isLoggedIn">
      <Header />
      <GroupList :groups="groups"/>
      <FormContainer>
        <BaseButton
          kind="normal"
          @click="onClickCreateGroup">
          グループをつくる
        </BaseButton>
        <BaseButton
          kind="normal"
          @click="onClickUpdateUser">
          プロフィールを更新する
        </BaseButton>
        <BaseButton
          @click="onClickLogout">
          ログアウト
        </BaseButton>
      </FormContainer>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Cover from '~/components/Cover';
import Header from '~/components/Header';
import GroupList from '~/components/GroupList';
import FormContainer from '~/components/FormContainer';
import BaseButton from '~/components/BaseButton';
import GoogleIcon from '~/components/GoogleIcon';

export default {
  middleware: ['auth'],
  components: {
    Cover,
    Header,
    GroupList,
    FormContainer,
    BaseButton,
    GoogleIcon
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

<style>
.AppName {
  margin-bottom: var(--space-md);
  letter-spacing: 0.1em;
  color: var(--color-pale-white);
  font-family: 'Varela Round', sans-serif;
  font-size: 2rem;
  font-weight: 700;
}
</style>
