<template>
  <form>
    <label>
      Name
      <input
        v-model="name"
        type="text">
    </label>
    <label>
      Description
      <input
        v-model="description"
        type="description">
    </label>
    <button
      type="submit"
      @click="onClick">
      Create group
    </button>
  </form>
</template>

<script>
  import { parse } from 'cookie'

  export default {
    data() {
      return {
        name: '',
        description: ''
      }
    },
    methods: {
      async onClick(e) {
        e.preventDefault()

        const { accessToken } = parse(document.cookie)

        await this.$store.dispatch('group/createGroup', {
          name: this.name,
          description: this.description,
          accessToken
        })

        this.name = ''
        this.description = ''
      }
    }
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
