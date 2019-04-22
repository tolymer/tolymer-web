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
                  :value="topScore"
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
import { Context } from '@nuxt/vue-app/types';
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
  data() {
    return {
      inputScores: [null, null, null, null]
    };
  },
  computed: {
    userNames: function() {
      const { members } = this.$store.state.event;

      return members.map(member => member.name || '');
    },
    topScore: function() {
      // TODO: ugly workaround, this.inputScores should be referred
      const amount = (this as any).inputScores.map(s => Number(s) || 0).reduce((acc, v) => acc + v, 0);
      return amount < 0 ? -amount : null;
    }
  },
  async fetch(context: Context) {
    try {
      const accessToken = context.app.$cookies.get('accessToken');
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
      // TODO: ugly workaround, this.inputScores should be referred
      const scores = (this as any).inputScores.filter(exist);

      if (scores.length < 3) {
        // 入力が3未満の場合はまだ不完全
        // 全部入力済みの状態でどこかが消された場合は'top'がある状態でここにくるので'top'をnullに戻す
        // TODO: ugly workaround, this.inputScores should be referred
        (this as any).inputScores = (this as any).inputScores.map(s => (exist(s) ? s : null));
      } else if (scores.length === 3) {
        // 入力が3以上の場合はトップ以外入力済み
        // TODO: ugly workaround, this.inputScores should be referred
        (this as any).inputScores = (this as any).inputScores.map((s: any) => (s === 0 || s ? s : 'top'));
      }
    },
    async onClick() {
      const scores = [];
      const eventId = this.$route.params.eventId;
      const accessToken = this.$cookies.get('accessToken');
      const { members } = this.$store.state.event;

      // TODO: ugly workaround, this.inputScores should be referred
      for (let i = 0; i < (this as any).inputScores.length; i++) {
        scores.push({
          user_id: members[i].id,
          point: (this as any).inputScores[i]
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
