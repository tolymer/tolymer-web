<template>
  <section>
    <Header :title="$store.state.event.title" />
    <form>
      <table>
        <thead>
          <tr>
            <th
              v-for="(userName, i) in userNames"
              :key="i"
            >
              {{ userName }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="(inputScore, i) in inputScores"
              :key="i"
            >
              <label v-if="inputScore === 'top'">
                <BaseInput
                  :value="topScore()"
                  type="number"
                  readonly
                />
              </label>
              <label v-if="inputScore !== 'top'">
                <BaseInput
                  v-model="inputScores[i]"
                  type="number"
                  @input="onInput"
                />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <FormContainer>
      <BaseButton
        kind="primary"
        @click.prevent="onClick"
      >
        保存
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import Header from '~/components/Header.vue';
import FormContainer from '~/components/FormContainer.vue';
import BaseButton from '~/components/BaseButton.vue';
import BaseInput from '~/components/BaseInput.vue';

export default Vue.extend({
  middleware: ['auth'],
  components: {
    Header,
    FormContainer,
    BaseButton,
    BaseInput
  },
  data(): { inputScores: (number | 'top' | null)[] } {
    return {
      inputScores: [null, null, null, null]
    };
  },
  computed: {
    userNames() {
      const { members } = this.$store.state.event;

      return members.map(member => member.name || '');
    }
  },
  async fetch({ params, store, error }: Context) {
    try {
      await store.dispatch('event/getEvent', {
        eventId: params.eventId
      });
    } catch (e) {
      error({
        message: 'Not found',
        statusCode: 404
      });
    }
  },
  methods: {
    topScore() {
      const amount = this.inputScores.map(s => Number(s) || 0).reduce((acc, v) => acc + v, 0);
      return amount < 0 ? -amount : null;
    },
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
    async onClick() {
      const scores = [];
      const { eventId } = this.$route.query;
      const { members } = this.$store.state.event;

      for (let i = 0; i < this.inputScores.length; i++) {
        scores.push({
          user_id: members[i].id,
          point: this.inputScores[i]
        });
      }

      await this.$store.dispatch('event/addEventGame', {
        eventId,
        scores
      });

      await this.$store.dispatch('event/getEvent', {
        eventId
      });
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
