<template>
  <section>
    <div v-if="!isLoggedIn">
      <h2>Log in</h2>
      <form @submit="onSubmitLogin">
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
        <button type="submit">Log in</button>
      </form>
      <h2>
        <router-link to="/users/new">
          Sign up
        </router-link>
      </h2>
    </div>
    <div v-if="isLoggedIn">
      <h2>Your data</h2>
      <p>id: {{ id }}</p>
      <p>name: {{ name }}</p>
      <h3>Log out</h3>
      <form @submit="onSubmitLogout">
        <button type="submit">Logout</button>
      </form>
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
      <h2>
        <router-link to="/groups/new">
          Create Group
        </router-link>
      </h2>
      <h2>
        Create Event (WIP)
      </h2>
      <p>New feature to create new event without group context.</p>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { parse } from 'cookie'

  export default {
    data() {
      return {
        loginName: '',
        loginPassword: ''
      }
    },
    computed: mapState({
      isLoggedIn: state => state.isLoggedIn,
      id: state => state.id,
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
      async onSubmitLogout(e) {
        e.preventDefault()

        document.cookie = "accessToken=; max-age=0";

        await this.$store.dispatch('logout')

        await this.$store.dispatch('deleteCurrentUser')
      }
    },
    async asyncData(context) {
      try {
        const { accessToken } = context.cookie

        if (!accessToken) {
          return
        }

        await context.store.dispatch('loggedIn')

        await context.store.dispatch('getCurrentUser', {
          accessToken
        })
      } catch (e) {
        context.error({
          message: 'Not found',
          statusCode: 404
        })
      }
    }
  }
</script>
