<template>
  <section>
    <div v-if="!isLoggedIn">
      <h2>ログイン</h2>
      <form @submit="onSubmitLogin">
        <label>
          名前
          <input
            v-model="loginName"
            type="text">
        </label>
        <label>
          パスワード
          <input
            v-model="loginPassword"
            type="password">
        </label>
        <button type="submit">ログインする</button>
      </form>
      <h2>新規登録</h2>
      <form @submit="onSubmitSignup">
        <label>
          名前
          <input
            v-model="signupName"
            type="text">
        </label>
        <label>
          パスワード
          <input
            v-model="signupPassword"
            type="password">
        </label>
        <button type="submit">ユーザーを作成する</button>
      </form>
    </div>
    <div v-if="isLoggedIn">
      <h2>{{ name }}</h2>
      <form @submit="onSubmitLogout">
        <button type="submit">ログアウトする</button>
      </form>
      <h3>参加中のグループ</h3>
      <ul>
        <li
          v-for="(group, index) in groups"
          :key="index">
          <router-link :to="groupLink(group.id)">
            {{ group.name }}
          </router-link>
        </li>
      </ul>
      <h2>
        <router-link to="/groups/new">
          グループを作成する
        </router-link>
      </h2>
      <p>Create group which people you play with belong to.</p>
      <h2>
        イベントを作成する
      </h2>
      <p>New feature to create new event without group context.</p>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { parse } from 'cookie'

  export default {
    middleware: ['auth'],
    data() {
      return {
        loginName: '',
        loginPassword: '',
        signupName: '',
        signupPassword: ''
      }
    },
    computed: mapState({
      isLoggedIn: state => state.isLoggedIn,
      name: state => state.name,
      groups: state => state.groups
    }),
    methods: {
      groupLink(id) {
        return `/groups/${id}`
      },
      async onSubmitLogin(e) {
        e.preventDefault()

        await this.$store.dispatch('login', {
          name: this.loginName,
          password: this.loginPassword
        })

        this.loginName = ''
        this.loginPassword = ''

        const { accessToken } = parse(document.cookie)

        await this.$store.dispatch('getCurrentUser', {
          accessToken
        })
      },
      async onSubmitSignup(e) {
        e.preventDefault()

        const name = this.signupName
        const password = this.signupPassword

        await this.$store.dispatch('user/createUser', {
          name,
          password
        })

        this.signupName = ''
        this.signupPassword = ''

        await this.$store.dispatch('login', {
          name,
          password
        })

        const { accessToken } = parse(document.cookie)

        await this.$store.dispatch('getCurrentUser', {
          accessToken
        })
      },
      async onSubmitLogout(e) {
        e.preventDefault()

        document.cookie = "accessToken=; max-age=0";

        await this.$store.dispatch('logout')

        await this.$store.dispatch('deleteCurrentUser')
      }
    }
  }
</script>
