<template>
  <section>
    <div v-if="!$store.state.isLoggedIn">
      <Cover>
        <h1 class="AppName">
          Tolymer
        </h1>
        <FormContainer @submit.prevent="onSubmitLogin">
          <BaseButton
            kind="normal"
            type="submit">
            <GoogleIcon slot="icon"/>
            Googleアカウントでサインイン
          </BaseButton>
        </FormContainer>
      </Cover>
    </div>
    <div v-if="$store.state.isLoggedIn">
      <Header />
      <GroupList :groups="$store.state.groups"/>
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
          @click.prevent="onClickLogout">
          ログアウト
        </BaseButton>
      </FormContainer>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Cover from '~/components/Cover.vue';
import Header from '~/components/Header.vue';
import GroupList from '~/components/GroupList.vue';
import FormContainer from '~/components/FormContainer.vue';
import BaseButton from '~/components/BaseButton.vue';
import GoogleIcon from '~/components/GoogleIcon.vue';

export default Vue.extend({
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
  methods: {
    async onSubmitLogin() {
      this.$router.push('/auth/google');
    },
    async onClickCreateGroup() {
      this.$router.push('/groups/new');
    },
    async onClickUpdateUser() {
      this.$router.push(`/users/${this.$store.state.id}/edit`);
    },
    async onClickLogout() {
      document.cookie = 'accessToken=; max-age=0';

      await this.$store.dispatch('logout');
      await this.$store.dispatch('deleteCurrentUser');
    }
  }
});
</script>

<style scoped>
.AppName {
  margin-bottom: var(--space-md);
  letter-spacing: 0.1em;
  color: var(--color-pale-white);
  font-family: 'Varela Round', sans-serif;
  font-size: 2rem;
  font-weight: 700;
}
</style>
