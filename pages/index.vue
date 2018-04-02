<template>
  <section>
    <h1>Index</h1>
    <LoginInfo />
    <Menu />
    <form>
      <label>
        ID
        <input
          v-model="name"
          type="text">
      </label>
      <label>
        Password
        <input
          v-model="password"
          type="password">
      </label>
      <button
        type="submit"
        @click="onClick">Login</button>
    </form>
  </section>
</template>

<script>
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

      await context.store.dispatch('me/getAll', {
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
