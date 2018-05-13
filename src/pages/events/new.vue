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
        <template slot="label">メンバー</template>
        <label
          v-for="(member, index) in members"
          :key="index"
          class="Checkbox">
          <input
            :value="member.id"
            :key="index"
            v-model="userIds"
            type="checkbox"
            class="Checkbox-input"
            name="members">
          <span class="Checkbox-label">
            {{ member.name }}
          </span>
        </label>
      </CheckboxContainer>
      <div slot="action">
        <BaseButton
          type="submit"
          kind="primary">
          作成
        </BaseButton>
      </div>
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
      userIds: []
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

    if (groupId) {
      await context.store.dispatch('event/getGroupMembers', {
        accessToken,
        groupId
      });
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const { title, description, date, accessToken, groupId, userIds } = this;

      if (groupId) {
        await this.$store.dispatch('event/createGroupEvent', {
          groupId,
          title,
          description,
          date,
          accessToken
        });
      } else {
        await this.$store.dispatch('event/createEvent', {
          title,
          description,
          date,
          accessToken
        });
      }

      const eventId = this.$store.state.event.id;

      if (userIds.length !== 0) {
        await this.$store.dispatch('event/addEventMembers', {
          eventId,
          userIds,
          accessToken
        });
      }

      this.$router.push(`/events/${eventId}`);
    }
  }
};
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
