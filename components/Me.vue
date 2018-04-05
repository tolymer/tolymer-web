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
        @click="onClick">Login</button>
    </form>
    <div v-if="isLoggedIn">
      <h2>{{ name }}</h2>
      <p>id: {{ id }}</p>
      <h2>Groups</h2>
      <ul>
        <li
          v-for="(group, index) in groups"
          :key="index">
          <h3>
            <router-link :to="groupLink(group.id)">
              {{ group.name }}
            </router-link>
          </h3>
        </li>
      </ul>
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
      async onClick(e) {
        e.preventDefault()

        await this.$store.dispatch('login', {
          name: this.loginName,
          password: this.loginPassword
        })

        this.loginName = ''
        this.loginPassword = ''
      }
    }
  }
</script>
