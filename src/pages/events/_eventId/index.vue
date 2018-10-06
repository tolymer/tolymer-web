<template>
  <section>
    <Header :title="$store.state.event.title" />
    <form>
      <table>
        <thead>
          <tr>
            <th class="Score__Time" />
            <th
              v-for="(userName, i) in userNames"
              :key="i"
            >
              {{ userName }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(game, index) in $store.state.event.games"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ formatPoint(game.scores[0].point) }}</td>
            <td>{{ formatPoint(game.scores[1].point) }}</td>
            <td>{{ formatPoint(game.scores[2].point) }}</td>
            <td>{{ formatPoint(game.scores[3].point) }}</td>
          </tr>
          <tr>
            <td>計</td>
            <td>{{ formatPoint(scoreA) }}</td>
            <td>{{ formatPoint(scoreB) }}</td>
            <td>{{ formatPoint(scoreC) }}</td>
            <td>{{ formatPoint(scoreD) }}</td>
          </tr>
        </tbody>
      </table>
    </form>
    <FormContainer>
      <BaseButton
        kind="primary"
        @click="onClickAddScore"
      >
        スコアを追加する
      </BaseButton>
      <BaseButton
        kind="primary"
        @click="onClickUpdateEvent"
      >
        イベントを更新する
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/Header.vue';
import FormContainer from '~/components/FormContainer.vue';
import BaseButton from '~/components/BaseButton.vue';

export default Vue.extend({
  middleware: ['auth'],
  components: {
    Header,
    FormContainer,
    BaseButton
  },
  data() {
    return {
      eventId: null,
      accessToken: null,
      inputA: 0,
      inputB: 0,
      inputC: 0,
      inputD: 0
    };
  },
  computed: {
    userNames: function() {
      const { members } = this.$store.state.event;

      return members.map(member => member.name || '');
    },
    scoreA: function() {
      const { games } = this.$store.state.event;
      const points = games.map(game => game.scores[0].point);

      return points.length === 0 ? 0 : points.reduce((p1, p2) => p1 + p2);
    },
    scoreB: function() {
      const { games } = this.$store.state.event;
      const points = games.map(game => game.scores[1].point);

      return points.length === 0 ? 0 : points.reduce((p1, p2) => p1 + p2);
    },
    scoreC: function() {
      const { games } = this.$store.state.event;
      const points = games.map(game => game.scores[2].point);

      return points.length === 0 ? 0 : points.reduce((p1, p2) => p1 + p2);
    },
    scoreD: function() {
      const { games } = this.$store.state.event;
      const points = games.map(game => game.scores[3].point);

      return points.length === 0 ? 0 : points.reduce((p1, p2) => p1 + p2);
    }
  },
  async asyncData(context) {
    const { accessToken } = context.cookie;
    const { eventId } = context.params;

    return {
      eventId,
      accessToken
    };
  },
  async fetch(context) {
    try {
      const { accessToken } = context.cookie;
      const { eventId } = context.params;
      const { join } = context.query;

      if (join) {
        const { id } = context.store.state;
        const userIds = [id];

        await context.store.dispatch('event/addEventMembers', {
          userIds,
          eventId,
          accessToken
        });
      }

      await context.store.dispatch('event/getEvent', {
        eventId,
        accessToken
      });
    } catch (e) {
      context.error({
        message: 'Not found',
        statusCode: 404
      });
    }
  },
  methods: {
    userLink(id) {
      return `/users/${id}`;
    },
    formatPoint(point) {
      if (Number(point) > 0) {
        return `+${point}`;
      }

      return point;
    },
    async onClickAddScore() {
      this.$router.push(`/events/${this.eventId}/add`);
    },
    async onClickUpdateEvent() {
      this.$router.push(`/events/${this.eventId}/edit`);
    }
  }
});
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

tr {
  border-bottom: 1px solid var(--color-gray);
}

tr:first-child {
  border-top: 1px solid var(--color-gray);
}

th,
td {
  padding: var(--space-base);
  font-size: 1.6rem;
}

th {
  text-align: center;
}

td {
  text-align: right;
}

th.Score__Time {
  width: 24px;
}

th:not(.Score__Time) {
  width: calc((100% - 24px) / 4);
  word-break: break-word;
}

td input {
  width: 100%;
}
</style>
