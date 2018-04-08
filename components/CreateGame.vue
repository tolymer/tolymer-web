<template>
  <form>
    <label>
      {{ userA.name }}
      <input
        v-model="scoreA"
        type="number">
    </label>
    <label>
      {{ userB.name }}
      <input
        v-model="scoreB"
        type="number">
    </label>
    <label>
      {{ userC.name }}
      <input
        v-model="scoreC"
        type="number">
    </label>
    <label>
      {{ userD.name }}
      <input
        v-model="scoreD"
        type="number">
    </label>
    <button
      type="submit"
      @click="onClick">
      Create game
    </button>
  </form>
</template>

<script>
  import { parse } from 'cookie'

  export default {
    props: {
      eventId: {
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
        scoreA: 0,
        scoreB: 0,
        scoreC: 0,
        scoreD: 0
      }
    },
    computed: {
      userA: function() {
        return this.members[0]
      },
      userB: function() {
        return this.members[1]
      },
      userC: function() {
        return this.members[2]
      },
      userD: function() {
        return this.members[3]
      }
    },
    methods: {
      async onClick(e) {
        e.preventDefault()

        const scores = [{
          user_id: this.userA.id,
          point: this.scoreA
        }, {
          user_id: this.userB.id,
          point: this.scoreB
        }, {
          user_id: this.userC.id,
          point: this.scoreC
        }, {
          user_id: this.userD.id,
          point: this.scoreD
        }]
        const { accessToken } = parse(document.cookie)

        await this.$store.dispatch('event/addEventGames', {
          eventId: this.eventId,
          scores,
          accessToken
        })
      }
    }
  }
</script>
