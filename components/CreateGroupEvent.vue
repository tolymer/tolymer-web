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
    <label
      v-for="(member, index) in members"
      :key="index">
      {{ member.name }}
      <input
        :value="member.id"
        v-model="userIds"
        type="checkbox"
        name="members">
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
      },
      members: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data() {
      return {
        title: '',
        description: '',
        date: format(Date.now(), 'YYYY-MM-DD'),
        userIds: []
      }
    },
    methods: {
      async onClick(e) {
        e.preventDefault()

        const { accessToken } = parse(document.cookie)
        const {
          groupId,
          title,
          description,
          date,
          userIds
        } = this

        if (userIds.length !== 4) {
          return
        }

        await this.$store.dispatch('event/createGroupEvent', {
          groupId,
          title,
          description,
          date,
          accessToken,
          userIds
        })

        this.title = ''
        this.description = ''
        this.date = ''
      }
    }
  }
</script>
