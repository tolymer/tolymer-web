<template>
  <section>
    <h1>Index</h1>
    <Me />
    <Menu />
    <form>
      <label>
        Name
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
  import Me from '~/components/Me'
  import Menu from '~/components/Menu'

  export default {
    components: {
      Me,
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
