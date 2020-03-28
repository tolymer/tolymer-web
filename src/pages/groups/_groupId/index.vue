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
import { Context } from '@nuxt/types';
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
  async fetch({ params, query, store, error }: Context) {
    try {
      if (query.join) {
        await store.dispatch('group/addGroupMembers', {
          groupId: params.groupId
        });
      }

      await store.dispatch('group/getGroup', {
        groupId: params.groupId
      });
    } catch (e) {
      error({
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
      this.$router.push(`/events/new?groupId=${this.$route.params.groupId}`);
    },
    async onClickUpdateGroup() {
      this.$router.push(`/groups/${this.$route.params.groupId}/edit`);
    }
  }
});
</script>
