<template>
  <section>
    <Header :title="title" />
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
          <td>{{ formatPoint(game.scores[0].point) }}</td>
          <td>{{ formatPoint(game.scores[1].point) }}</td>
          <td>{{ formatPoint(game.scores[2].point) }}</td>
          <td>{{ formatPoint(game.scores[3].point) }}</td>
        </tr>
        <tr>
          <td>
            <button
              type="submit"
              @click="onClick">
              +
            </button>
          </td>
          <td>
            <input
              v-model="inputA"
              type="number">
          </td>
          <td>
            <input
              v-model="inputB"
              type="number">
          </td>
          <td>
            <input
              v-model="inputC"
              type="number">
          </td>
          <td>
            <input
              v-model="inputD"
              type="number">
          </td>
        </tr>
        <tr>
          <td>計</td>
          <td>{{ formatPoint(scoreA) }}</td>
          <td>{{ formatPoint(scoreB) }}</td>
          <td>{{ formatPoint(scoreC) }}</td>
          <td>{{ formatPoint(scoreD) }}</td>
        </tr>
      </table>
    </form>
    <FormContainer>
      <BaseButton
        kind="bordered"
        @click="onClickUpdateEvent">
        イベントを更新する
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Header from '~/components/Header';
import FormContainer from '~/components/FormContainer';
import BaseButton from '~/components/BaseButton';

const memberDefault = {
  name: ''
};

export default {
  middleware: ['auth'],
  components: {
    Header,
    FormContainer,
    BaseButton
  },
  data() {
    return {
      inputA: 0,
      inputB: 0,
      inputC: 0,
      inputD: 0
    };
  },
  computed: {
    userA: function() {
      return this.members[0] || memberDefault;
    },
    userB: function() {
      return this.members[1] || memberDefault;
    },
    userC: function() {
      return this.members[2] || memberDefault;
    },
    userD: function() {
      return this.members[3] || memberDefault;
    },
    scoreA: function() {
      const points = this.games.map(game => game.scores[0].point);
      return points.length === 0 ? 0 : points.reduce((p1, p2) => p1 + p2);
    },
    scoreB: function() {
      const points = this.games.map(game => game.scores[1].point);
      return points.length === 0 ? 0 : points.reduce((p1, p2) => p1 + p2);
    },
    scoreC: function() {
      const points = this.games.map(game => game.scores[2].point);
      return points.length === 0 ? 0 : points.reduce((p1, p2) => p1 + p2);
    },
    scoreD: function() {
      const points = this.games.map(game => game.scores[3].point);
      return points.length === 0 ? 0 : points.reduce((p1, p2) => p1 + p2);
    },
    ...mapState({
      title: state => state.event.title,
      date: state => state.event.date,
      members: state => state.event.members,
      games: state => state.event.games
    })
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
    async onClick(e) {
      e.preventDefault();

      const scores = [
        {
          user_id: this.userA.id,
          point: this.inputA
        },
        {
          user_id: this.userB.id,
          point: this.inputB
        },
        {
          user_id: this.userC.id,
          point: this.inputC
        },
        {
          user_id: this.userD.id,
          point: this.inputD
        }
      ];
      const { eventId, accessToken } = this;

      await this.$store.dispatch('event/addEventGames', {
        eventId,
        scores,
        accessToken
      });

      await this.$store.dispatch('event/getEvent', {
        eventId,
        accessToken
      });
    },
    async onClickUpdateEvent() {
      this.$router.push(`/events/${this.eventId}/edit`);
    }
  }
};
</script>

<style>
table {
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

th:first-child {
  width: 24px;
}

th:not(:first-child) {
  width: calc((100% - 24px) / 4);
  word-break: break-word;
}

td input {
  width: 100%;
}
</style>
