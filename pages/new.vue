<template>
  <section>
    <h1>New</h1>
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
      <button type="submit" @click="onClick">Sign up</button>
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

        await this.$store.dispatch('new', {
          name: this.name,
          password: this.password
        })

        this.name = ''
        this.password = ''
      }
    }
  }
</script>
