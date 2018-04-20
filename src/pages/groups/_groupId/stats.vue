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
    <h2>Chart</h2>
    <line-chart :data="calcChartData()" />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import LineChart from '~/components/LineChart';

export default {
  middleware: ['auth'],
  components: { LineChart },
  data() {
    return {
      groupId: ''
    };
  },
  async asyncData(context) {
    const { groupId } = context.params;

    return {
      groupId
    };
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
        totalScore[member.id] = { name: member.name, score: 0 };
      });
      this.stats.forEach(stat => {
        stat.scores.forEach(score => {
          score.forEach(s => {
            totalScore[s.user_id].score += s.point;
          });
        });
        stat.tips.forEach(t => {
          totalScore[t.user_id].score += t.point;
        });
      });
      return totalScore;
    },
    calcChartData() {
      const labels = [];
      const datasets = {};
      const colors = ['red', 'blue', 'green', 'yellow'];
      this.members.forEach((member, i) => {
        datasets[member.id] = {
          label: member.name,
          fill: false,
          borderColor: colors[i],
          backgroundColor: colors[i],
          data: []
        };
      });
      this.stats.forEach(stat => {
        labels.push(stat.date);
        const scoreByUserId = {};
        this.members.forEach(m => (scoreByUserId[m.id] = 0));
        stat.scores.forEach(score => {
          score.forEach(s => {
            scoreByUserId[s.user_id] += s.point;
          });
        });
        stat.tips.forEach(t => {
          scoreByUserId[t.user_id] += t.point;
        });
        this.members.forEach(member => {
          const data = datasets[member.id].data;
          const beforeValue = data[data.length - 1] || 0;
          datasets[member.id].data.push(scoreByUserId[member.id] + beforeValue);
        });
      });
      return { labels, datasets: Object.values(datasets) };
    }
  },
  async fetch(context) {
    try {
      const { accessToken } = context.cookie;
      const { groupId } = context.params;

      await context.store.dispatch('group/getGroup', {
        groupId,
        accessToken
      });

      await context.store.dispatch('group/getStats', {
        accessToken,
        groupId
      });
    } catch (e) {
      context.error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
};
</script>