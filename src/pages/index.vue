<template>
  <section>
    <div v-if="!isLoggedIn">
      <div class="Index">
        <h1 class="Index-title">
          Tolymer
        </h1>
        <FormContainer @submit="onSubmitLogin">
          <BaseButton type="submit">
            <GoogleIcon slot="icon"/>
            Googleアカウントでサインイン
          </BaseButton>
        </FormContainer>
      </div>
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
import GoogleIcon from '~/components/GoogleIcon';

export default {
  middleware: ['auth'],
  components: {
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
  .Index {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    background-image:
      linear-gradient(-180deg, rgba(47,66,49,1) 0%, rgba(48,52,59,0.95) 100%),
      url('~assets/images/sticks.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0, center bottom;
  }

  .Index-title {
    margin-bottom: var(--space-md);
    letter-spacing: 0.1em;
    font-family: 'Varela Round', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-pale-white);
  }
</style>
