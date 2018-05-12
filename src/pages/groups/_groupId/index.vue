<template>
  <section>
    <Header
      :title="name"
      :subtitle="description" />
    <EventList :events="events" />
    <FormContainer>
      <BaseButton
        kind="normal"
        @click="onClickCreateEvent">
        イベントをつくる
      </BaseButton>
      <BaseButton
        kind="normal"
        @click="onClickUpdateGroup">
        グループを編集する
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Header from '~/components/Header';
import EventList from '~/components/EventList';
import FormContainer from '~/components/FormContainer';
import BaseButton from '~/components/BaseButton';

export default {
  middleware: ['auth'],
  components: {
    Header,
    EventList,
    FormContainer,
    BaseButton
  },
  computed: mapState({
    name: state => state.group.name,
    description: state => state.group.description,
    members: state => state.group.members,
    events: state => state.group.events
  }),
  async asyncData(context) {
    const { groupId } = context.params;

    return {
      groupId
    };
  },
  async fetch(context) {
    try {
      const { accessToken } = context.cookie;
      const { groupId } = context.params;
      const { join } = context.query;

      if (join) {
        await context.store.dispatch('group/addGroupMembers', {
          groupId,
          accessToken
        });
      }

      await context.store.dispatch('group/getGroup', {
        groupId,
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
    async onClickCreateEvent() {
      this.$router.push(`/events/new?groupId=${this.groupId}`);
    },
    async onClickUpdateGroup() {
      this.$router.push(`/groups/${this.groupId}/edit`);
    }
  }
};
</script>
