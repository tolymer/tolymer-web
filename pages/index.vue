<template>
  <section>
    <h1>Index</h1>
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
  import Menu from '~/components/Menu'

  export default {
    components: {
      Menu
    },
    data() {
      return {
        name: '',
        password: ''
      }
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
