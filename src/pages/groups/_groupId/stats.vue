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
import { Context } from '@nuxt/types';
import { groupModule } from '~/store/modules/group';
import Header from '~/components/Header.vue';
import LineChart from '~/components/LineChart.js';

export default Vue.extend({
  middleware: ['auth'],
  components: {
    Header,
    LineChart
  },
  methods: {
    calcTotalScore() {
      const groupState = groupModule.context(this.$store);
      const totalScore = {};

      groupState.getters.members.forEach(member => {
        totalScore[member.id] = {
          name: member.name,
          score: 0
        };
      });

      groupState.getters.stats.forEach(stat => {
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
      const groupState = groupModule.context(this.$store);

      const labels = [];
      const datasets = {};
      const colors = ['red', 'blue', 'green', 'yellow'];

      groupState.getters.members.forEach((member, i) => {
        datasets[member.id] = {
          label: member.name,
          fill: false,
          borderColor: colors[i],
          backgroundColor: colors[i],
          data: []
        };
      });

      groupState.getters.stats.forEach(stat => {
        labels.push(stat.date);
        const scoreByUserId = {};

        groupState.getters.members.forEach(m => {
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

        groupState.getters.members.forEach(member => {
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
  async fetch({ params, store, error }: Context) {
    try {
      const groupState = groupModule.context(store);

      await groupState.actions.getGroup(params.groupId);
      await groupState.actions.getGroupStats(params.groupId);
    } catch (e) {
      error({
        message: 'Not found',
        statusCode: 404
      });
    }
  }
});
</script>
