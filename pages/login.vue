<template>
  <section>
    <h1>Login</h1>
    <Menu />
    <form>
      <input type="text" v-model="name">
      <input type="password" v-model="password">
      <button type="submit" @click="onClick">Login</button>
    </form>
    <router-link to="/users/1">/users/1</router-link>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
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
