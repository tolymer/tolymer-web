<template>
  <section>
    <Header :title="title" />
    <form>
      <table>
        <thead>
          <tr>
            <th
              v-for="(userName, i) in userNames"
              :key="i">
              {{ userName }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="(inputScore, i) in inputScores"
              :key="i">
              <label v-if="inputScore === 'top'">
                <BaseInput
                  :value="topScore"
                  type="number"
                  readonly />
              </label>
              <label v-if="inputScore !== 'top'">
                <BaseInput
                  v-model="inputScores[i]"
                  type="number"
                  @input="onInput" />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <FormContainer>
      <BaseButton
        kind="primary"
        @click="onClick">
        保存
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Header from '~/components/Header';
import FormContainer from '~/components/FormContainer';
import BaseButton from '~/components/BaseButton';
import BaseInput from '~/components/BaseInput';

export default {
  middleware: ['auth'],
  components: {
    Header,
    FormContainer,
    BaseButton,
    BaseInput
  },
  data() {
    return {
      inputScores: [null, null, null, null]
    };
  },
  computed: {
    userNames: function() {
      return this.members.map(member => member.name || '');
    },
    topScore: function() {
      const amount = this.inputScores.map(s => Number(s) || 0).reduce((acc, v) => acc + v, 0);
      return amount < 0 ? -amount : null;
    },
    ...mapState({
      title: state => state.event.title,
      members: state => state.event.members
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
    async onInput() {
      // 'top'という値は入力されていないとみなす
      // 0 は入力されているとみなす
      const exist = score => score === 0 || (score && score !== 'top');

      // 入力されているフィールドの値だけを抽出
      const scores = this.inputScores.filter(exist);

      if (scores.length < 3) {
        // 入力が3未満の場合はまだ不完全
        // 全部入力済みの状態でどこかが消された場合は'top'がある状態でここにくるので'top'をnullに戻す
        this.inputScores = this.inputScores.map(s => (exist(s) ? s : null));
      } else if (scores.length === 3) {
        // 入力が3以上の場合はトップ以外入力済み
        this.inputScores = this.inputScores.map(s => (s === 0 || s ? s : 'top'));
      }
    },
    async onClick(e) {
      e.preventDefault();

      const scores = [];
      const { eventId, accessToken } = this;

      for (let i = 0; i < this.inputScores.length; i++) {
        scores.push({
          user_id: this.members[i].id,
          point: this.inputScores[i]
        });
      }

      await this.$store.dispatch('event/addEventGame', {
        eventId,
        scores,
        accessToken
      });

      await this.$store.dispatch('event/getEvent', {
        eventId,
        accessToken
      });
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
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
