<template>
  <section>
    <Header :title="$store.state.group.name" />
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
          :key="id"
        >
          <td>{{ v.name }}</td>
          <td>{{ v.score }}</td>
        </tr>
      </tbody>
    </table>
    <line-chart :data="calcChartData()" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/Header.vue';
import LineChart from '~/components/LineChart.js';

export default Vue.extend({
  middleware: ['auth'],
  components: {
    Header,
    LineChart
  },
  data() {
    return {
      groupId: null
    };
  },
  async asyncData(context) {
    const { groupId } = context.params;

    return {
      groupId
    };
  },
  methods: {
    calcTotalScore() {
      const { members, stats } = this.$store.state.group;
      const totalScore = {};

      members.forEach(member => {
        totalScore[member.id] = {
          name: member.name,
          score: 0
        };
      });

      stats.forEach(stat => {
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
      const { members, stats } = this.$store.state.group;
      const labels = [];
      const datasets = {};
      const colors = ['red', 'blue', 'green', 'yellow'];

      members.forEach((member, i) => {
        datasets[member.id] = {
          label: member.name,
          fill: false,
          borderColor: colors[i],
          backgroundColor: colors[i],
          data: []
        };
      });

      stats.forEach(stat => {
        labels.push(stat.date);
        const scoreByUserId = {};

        members.forEach(m => {
          scoreByUserId[m.id] = 0;
        });

        stat.scores.forEach(score => {
          score.forEach(s => {
            scoreByUserId[s.user_id] += s.point;
          });
        });

        stat.tips.forEach(t => {
          scoreByUserId[t.user_id] += t.point;
        });

        members.forEach(member => {
          const data = datasets[member.id].data;
          const beforeValue = data[data.length - 1] || 0;

          datasets[member.id].data.push(scoreByUserId[member.id] + beforeValue);
        });
      });

      return {
        labels,
        datasets: Object.values(datasets)
      };
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
});
</script>
