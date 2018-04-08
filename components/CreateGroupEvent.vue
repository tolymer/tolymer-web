<template>
  <form>
    <label>
      Title
      <input
        v-model="title"
        type="text">
    </label>
    <label>
      Description
      <input
        v-model="description"
        type="text">
    </label>
    <label>
      Date
      <input
        v-model="date"
        type="date">
    </label>
    <button
      type="submit"
      @click="onClick">
      Create event
    </button>
  </form>
</template>

<script>
  import { parse } from 'cookie'
  import { format } from 'date-fns'

  export default {
    props: {
      groupId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        title: '',
        description: '',
        date: format(Date.now(), 'YYYY-MM-DD')
      }
    },
    methods: {
      async onClick(e) {
        e.preventDefault()

        const { accessToken } = parse(document.cookie)

        await this.$store.dispatch('event/createGroupEvent', {
          groupId: this.groupId,
          title: this.title,
          description: this.description,
          date: this.date,
          accessToken
        })

        this.title = ''
        this.description = ''
        this.date = ''
      }
    }
  }
</script>
