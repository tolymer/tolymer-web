<template>
  <form>
    <input type="text" v-model="name">
    <input type="password" v-model="password">
    <button @click="onClick">login</button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        name: '',
        password: ''
      }
    },
    methods: {
      onClick(e) {
        this.$store.dispatch('app/login', {
          name: this.name,
          password: this.password
        })
      }
    }
  }
</script>
