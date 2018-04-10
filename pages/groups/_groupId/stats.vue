<template>
  <section>
    <h2>Total</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(v, id) in calcTotalScore()"
          :key="id">
          <td>{{ v.name }}</td>
          <td>{{ v.score }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    middleware: ['auth'],
    data() {
      return {
        groupId: ''
      }
    },
    async asyncData(context) {
      const { groupId } = context.params

      return {
        groupId
      }
    },
    computed: mapState({
      id: state => state.group.id,
      name: state => state.group.name,
      description: state => state.group.description,
      members: state => state.group.members,
      events: state => state.group.events,
      stats: state => state.group.stats
    }),
    methods: {
      calcTotalScore() {
        const totalScore = {};
        this.members.forEach(member => {
          totalScore[member.id] = { name: member.name, score: 0 }
        })
        this.stats.forEach(stat => {
           stat.scores.forEach(score => {
             score.forEach(s => {
               totalScore[s.user_id].score += s.point
             })
           })
           stat.tips.forEach(t => {
             totalScore[t.user_id].score += t.point
           })
        })
        return totalScore
      },
    },
    async fetch(context) {
      try {
        const { accessToken } = context.cookie
        const { groupId } = context.params

        await context.store.dispatch('group/getGroup', {
          groupId,
          accessToken
        })

        await context.store.dispatch('group/getStats', {
          accessToken,
          groupId
        })
      } catch (e) {
        context.error({
          message: 'Not found',
          statusCode: 404
        })
      }
    }
  };
</script>
