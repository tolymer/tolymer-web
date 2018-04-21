<template>
  <section>
    <Header/>
    <FormContainer @submit="onSubmit">
      <BaseInput
        v-model="title"
        type="text"
        label="イベント名"/>
      <BaseInput
        v-model="description"
        type="text"
        label="イベントメモ"/>
      <BaseInput
        v-model="date"
        type="date"
        label="日程"/>
      <CheckboxContainer>
        メンバー
        <label
          v-for="(member, index) in members"
          :key="index"
          class="CheckboxLabel">
          <input
            :value="member.id"
            :key="index"
            v-model="memberIds"
            type="checkbox"
            class="Checkbox"
            name="members">
          {{ member.name }}
        </label>
      </CheckboxContainer>
      <BaseButton type="submit">
        作成
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { format } from 'date-fns';
import Header from '~/components/Header';
import FormContainer from '~/components/FormContainer';
import CheckboxContainer from '~/components/CheckboxContainer';
import BaseInput from '~/components/BaseInput';
import BaseButton from '~/components/BaseButton';

export default {
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
      memberIds: []
    };
  },
  computed: mapState({
    members: state => state.event.groupMembers
  }),
  async asyncData(context) {
    const { accessToken } = context.cookie;
    const { groupId } = context.query;

    return {
      accessToken,
      groupId
    };
  },
  async fetch(context) {
    const { accessToken } = context.cookie;
    const { groupId } = context.query;

    if (!groupId) {
      return;
    }

    await context.store.dispatch('event/getGroupMembers', {
      accessToken,
      groupId
    });
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      if (this.memberIds.length !== 4) {
        return;
      }

      const {
        title,
        description,
        date,
        accessToken
      } = this;

      await this.$store.dispatch('event/createEvent', {
        title,
        description,
        date,
        accessToken
      });

      this.title = '';
      this.description = '';
      this.date = '';
    }
  }
};
</script>

<style>
.CheckboxLabel {
  padding: calc(var(--space-base) / 2);
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  max-width: 320px;
}

.Checkbox {
  margin-right: var(--space-base);
}
</style>
