<template>
  <form>
    <label>
      タイトル
      <input
        v-model="title"
        type="text">
    </label>
    <label>
      説明
      <input
        v-model="description"
        type="text">
    </label>
    <label>
      日付
      <input
        v-model="date"
        type="date">
    </label>
    <button
      type="submit"
      @click="onClick">
      イベントを作成する
    </button>
  </form>
</template>

<script>
  import { parse } from 'cookie'
  import { format } from 'date-fns'

  export default {
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
