<template>
  <section>
    <h1>Sign up</h1>
    <Menu />
    <form>
      <input type="text" v-model="name">
      <input type="password" v-model="password">
      <button type="submit" @click="onClick">Sign up</button>
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

        try {
          const { data } = await axios.post(`http://localhost:3000/users`, {
            name: this.name,
            password: this.password
          })

          console.info(data)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
</script>
