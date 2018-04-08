<template>
  <section>
    <h2>Event</h2>
    <p>title: {{ title }}</p>
    <p>description: {{ description }}</p>
    <p>date: {{ date }}</p>
    <h3>Event Members</h3>
    <ul>
      <li
        v-for="(member, index) in members"
        :key="index">
        <router-link :to="userLink(member.id)">
          {{ member.name }}
        </router-link>
      </li>
    </ul>
    <h3>Event Games</h3>
    <table>
      <tr>
        <th />
        <th>{{ userA.name }}</th>
        <th>{{ userB.name }}</th>
        <th>{{ userC.name }}</th>
        <th>{{ userD.name }}</th>
      </tr>
      <tr
        v-for="(game, index) in games"
        :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ game.scores[0].point }}</td>
        <td>{{ game.scores[1].point }}</td>
        <td>{{ game.scores[2].point }}</td>
        <td>{{ game.scores[3].point }}</td>
      </tr>
    </table>
    <h3>Create Game</h3>
    <CreateGame
      :event-id="eventId"
      :members="members" />
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import CreateGame from '~/components/CreateGame'

  export default {
    middleware: ['auth'],
    components: {
      CreateGame
    },
    data() {
      return {
        eventId: ''
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
      },
      ...mapState({
        title: state => state.event.title,
        description: state => state.event.description,
        date: state => state.event.date,
        members: state => state.event.members,
        games: state => state.event.games,
      })
    },
    methods: {
      userLink(id) {
        return `/users/${id}`
      }
    },
    async asyncData(context) {
      const { eventId } = context.params

      return {
        eventId
      }
    },
    async fetch(context) {
      try {
        const { accessToken } = context.cookie
        const { eventId } = context.params
        const { join } = context.query

        if (join) {
          const { id } = context.store.state
          const userIds = [id]

          await context.store.dispatch('event/addEventMembers', {
            userIds,
            eventId,
            accessToken
          })
        }

        await context.store.dispatch('event/getEvent', {
          eventId,
          accessToken
        })
      } catch (e) {
        context.error({
          message: 'Not found',
          statusCode: 404
        })
      }
    }
  }
</script>
