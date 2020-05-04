<template>
  <section>
    <Header />
    <FormContainer @submit.prevent="onSubmit">
      <BaseInput
        v-model="title"
        type="text"
        label="イベント名"
      />
      <BaseInput
        v-model="description"
        type="text"
        label="イベントメモ"
      />
      <BaseInput
        v-model="date"
        type="date"
        label="日程"
      />
      <CheckboxContainer>
        <template slot="label">
          メンバー
        </template>
        <label
          v-for="(member, index) in $store.state.event.groupMembers"
          :key="index"
          class="Checkbox"
        >
          <input
            :key="index"
            v-model="userIds"
            :value="member.id"
            type="checkbox"
            class="Checkbox-input"
            name="members"
          >
          <span class="Checkbox-label">
            {{ member.name }}
          </span>
        </label>
      </CheckboxContainer>
      <div slot="action">
        <BaseButton
          type="submit"
          kind="primary"
        >
          作成
        </BaseButton>
      </div>
    </FormContainer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import { format } from 'date-fns';
import { eventModule } from '~/store/modules/event';
import Header from '~/components/Header.vue';
import FormContainer from '~/components/FormContainer.vue';
import CheckboxContainer from '~/components/CheckboxContainer.vue';
import BaseInput from '~/components/BaseInput.vue';
import BaseButton from '~/components/BaseButton.vue';

export default Vue.extend({
  middleware: ['auth'],
  components: {
    Header,
    FormContainer,
    CheckboxContainer,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      title: '',
      description: '',
      date: format(Date.now(), 'YYYY-MM-DD'),
      userIds: []
    };
  },
  async fetch({ query, store }: Context) {
    if (query.groupId) {
      const eventState = eventModule.context(store);

      await eventState.actions.getGroupMembers(query.groupId as string);
    }
  },
  methods: {
    async onSubmit() {
      const eventState = eventModule.context(this.$store);
      const groupId = this.$route.query.groupId as string;

      if (groupId) {
        await eventState.actions.createGroupEvent({
          groupId,
          title: this.title,
          description: this.description,
          date: this.date
        });
      } else {
        await eventState.actions.createEvent({
          title: this.title,
          description: this.description,
          date: this.date
        });
      }

      const eventId = eventState.getters.id;

      if (this.userIds.length !== 0) {
        await eventState.actions.addEventMembers({
          eventId,
          userIds: this.userIds as string[]
        });
      }

      this.$router.push(`/events/${eventId}`);
    }
  }
});
</script>

<style scoped>
.Checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.Checkbox-input {
  width: 1.25em;
  height: 1.25em;
  margin-right: var(--space-2x);
}

.Checkbox-label {
  margin-right: var(--space-2x);
}
</style>
