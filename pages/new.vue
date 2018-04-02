<template>
  <section>
    <h1>New</h1>
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
        @click="onClick">
        Sign up
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
