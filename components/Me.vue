<template>
  <section>
    <form v-if="!isLoggedIn">
      <label>
        Name
        <input
          v-model="loginName"
          type="text">
      </label>
      <label>
        Password
        <input
          v-model="loginPassword"
          type="password">
      </label>
      <button
        type="submit"
        @click="onClickLogin">Login</button>
    </form>
    <div v-if="isLoggedIn">
      <h2>User</h2>
      <p>name: {{ name }}</p>
      <p>id: {{ id }}</p>
      <h3>Joined Groups</h3>
      <ul>
        <li
          v-for="(group, index) in groups"
          :key="index">
          <router-link :to="groupLink(group.id)">
            {{ group.name }}
          </router-link>
        </li>
      </ul>
      <button @click="onClickLogout">
        logout
      </button>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        loginName: '',
        loginPassword: ''
      }
    },
    computed: mapState({
      isLoggedIn: state => state.isLoggedIn,
      id: state => state.me.id,
      name: state => state.me.name,
      groups: state => state.me.groups
    }),
    methods: {
      groupLink(id) {
        return `/groups/${id}`
      },
      async onClickLogin(e) {
        e.preventDefault()

        await this.$store.dispatch('login', {
          name: this.loginName,
          password: this.loginPassword
        })

        this.loginName = ''
        this.loginPassword = ''
      },
      async onClickLogout(e) {
        e.preventDefault()

        document.cookie = "accessToken=; max-age=0";

        await this.$store.dispatch('logout')
      }
    }
  }
</script>
