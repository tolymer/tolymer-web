<template>
  <section>
    <h2>{{ title }}（{{ date }}）</h2>
    <p>{{ description }}</p>
    <h3>{{ title }}のメンバー</h3>
    <ul>
      <li
        v-for="(member, index) in members"
        :key="index">
        <router-link :to="userLink(member.id)">
          {{ member.name }}
        </router-link>
      </li>
    </ul>
    <h3>イベントの結果</h3>
    <form>
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
        <CreateGame
          :event-id="eventId"
          :members="members" />
        <tr>
          <td>計</td>
          <td>{{ scoreA }}</td>
          <td>{{ scoreB }}</td>
          <td>{{ scoreC }}</td>
          <td>{{ scoreD }}</td>
        </tr>
      </table>
    </form>
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
        return this.members[0] || {
          name: ''
        }
      },
      userB: function() {
        return this.members[1] || {
          name: ''
        }
      },
      userC: function() {
        return this.members[2] || {
          name: ''
        }
      },
      userD: function() {
        return this.members[3] || {
          name: ''
        }
      },
      scoreA: function() {
        return this.games
          .map(game => game.scores[0].point)
          .reduce((a, b) => a + b)
      },
      scoreB: function() {
        return this.games
          .map(game => game.scores[1].point)
          .reduce((a, b) => a + b)
      },
      scoreC: function() {
        return this.games
          .map(game => game.scores[2].point)
          .reduce((a, b) => a + b)
      },
      scoreD: function() {
        return this.games
          .map(game => game.scores[3].point)
          .reduce((a, b) => a + b)
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

<style>
  table {
    table-layout: fixed;
  }

  th,
  td {
    text-align: center;
  }

  th:first-child {
    width: 24px;
  }

  th:not(:first-child) {
    width: calc((100% - 24px) / 4);
    word-break: break-word;
  }
</style>
