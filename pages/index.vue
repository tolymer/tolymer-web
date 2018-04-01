<template>
  <section>
    <h1>Index</h1>
    <LoginInfo />
    <Menu />
    <form>
      <label>
        ID
        <input type="text" v-model="name">
      </label>
      <label>
        Password
        <input type="password" v-model="password">
      </label>
      <button type="submit" @click="onClick">Login</button>
    </form>
  </section>
</template>

<script>
  import axios from 'axios'
  import LoginInfo from '~/components/LoginInfo'
  import Menu from '~/components/Menu'

  export default {
    components: {
      LoginInfo,
      Menu
    },
    data() {
      return {
        name: '',
        password: ''
      }
    },
    async asyncData(context) {
      const { accessToken } = context.cookie

      await context.store.dispatch('user/getCurrentUser', {
        accessToken
      })
    },
    methods: {
      async onClick(e) {
        e.preventDefault()

        await this.$store.dispatch('login', {
          name: this.name,
          password: this.password
        })

        this.name = ''
        this.password = ''
      }
    }
  }
</script>
