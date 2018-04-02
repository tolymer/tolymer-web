<template>
  <section>
    <h1>New User</h1>
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
        @click="onClick">
        Create user
      </button>
    </form>
  </section>
</template>

<script>
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

        await this.$store.dispatch('user/createUser', {
          name: this.name,
          password: this.password
        })

        this.name = ''
        this.password = ''
      }
    }
  }
</script>
