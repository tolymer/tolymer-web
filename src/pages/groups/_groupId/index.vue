<template>
  <section>
    <Header
      :title="$store.state.group.name"
      :subtitle="$store.state.group.description"
    />
    <EventList :events="$store.state.group.events" />
    <FormContainer>
      <BaseButton
        kind="normal"
        @click="onClickCreateEvent"
      >
        イベントをつくる
      </BaseButton>
      <BaseButton
        kind="normal"
        @click="onClickUpdateGroup"
      >
        グループを編集する
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/vue-app/types';
import Header from '~/components/Header.vue';
import EventList from '~/components/EventList.vue';
import FormContainer from '~/components/FormContainer.vue';
import BaseButton from '~/components/BaseButton.vue';

export default Vue.extend({
  middleware: ['auth'],
  components: {
    Header,
    EventList,
    FormContainer,
    BaseButton
  },
  data() {
    return {
      groupId: null
    };
  },
  async asyncData(context: Context) {
    const { groupId } = context.params;

    return {
      groupId
    };
  },
  async fetch(context: Context) {
    try {
      const accessToken = context.app.$cookies.get('accessToken');
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
});
</script>
