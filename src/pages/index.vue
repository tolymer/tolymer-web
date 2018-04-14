<template>
  <section>
    <div v-if="!isLoggedIn">
      <form
        class="FormContainer"
        @submit="onSubmitLogin">
        <BaseInput
          v-model="name"
          label="ログインID"/>
        <BaseInput
          v-model="password"
          label="パスワード"/>
        <BaseButton type="submit">
          ログイン
        </BaseButton>
      </form>
    </div>
    <div v-if="isLoggedIn">
      <Header />
      <GroupList :groups="groups"/>
      <div class="FormContainer">
        <BaseButton
          kind="bordered"
          @click="onClickCreateGroup">
          新しいグループをつくる
        </BaseButton>
        <BaseButton
          kind="bordered"
          @click="onClickLogout">
          ログアウト
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { parse } from "cookie";
import Header from '~/components/Header';
import GroupList from '~/components/GroupList';
import BaseInput from '~/components/BaseInput';
import BaseButton from '~/components/BaseButton';

export default {
  middleware: ["auth"],
  components: {
    Header,
    GroupList,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      name: "",
      password: ""
    };
  },
  computed: mapState({
    isLoggedIn: state => state.isLoggedIn,
    groups: state => state.groups
  }),
  methods: {
    async onSubmitLogin(e) {
      e.preventDefault();

      await this.$store.dispatch("login", {
        name: this.name,
        password: this.password
      });

      this.name = "";
      this.password = "";

      const { accessToken } = parse(document.cookie);

      await this.$store.dispatch("getCurrentUser", {
        accessToken
      });
    },
    async onClickCreateGroup() {
      this.$router.push('/groups/new');
    },
    async onClickLogout(e) {
      e.preventDefault();

      document.cookie = "accessToken=; max-age=0";

      await this.$store.dispatch("logout");
      await this.$store.dispatch("deleteCurrentUser");
    }
  }
};
</script>
