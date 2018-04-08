<template>
  <form>
    <label>
      名前
      <input
        v-model="name"
        type="text">
    </label>
    <label>
      説明
      <input
        v-model="description"
        type="description">
    </label>
    <button
      type="submit"
      @click="onClick">
      グループを作成する
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
