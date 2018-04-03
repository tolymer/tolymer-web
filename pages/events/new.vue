<template>
  <section>
    <h1>New Event</h1>
    <Menu />
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
  </section>
</template>

<script>
  import { parse } from 'cookie'
  import Menu from '~/components/Menu'

  export default {
    components: {
      Menu
    },
    data() {
      return {
        title: '',
        description: '',
        date: ''
      }
    },
    methods: {
      async onClick(e) {
        e.preventDefault()

        const { accessToken } = parse(document.cookie)

        await this.$store.dispatch('event/createEvent', {
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
