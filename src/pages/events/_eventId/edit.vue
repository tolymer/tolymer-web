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
      <div slot="action">
        <BaseButton
          type="submit"
          kind="primary"
        >
          更新
        </BaseButton>
      </div>
    </FormContainer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/vue-app/types';
import Header from '~/components/Header.vue';
import FormContainer from '~/components/FormContainer.vue';
import BaseInput from '~/components/BaseInput.vue';
import BaseButton from '~/components/BaseButton.vue';

export default Vue.extend({
  middleware: ['auth'],
  components: {
    Header,
    FormContainer,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      title: null,
      description: null,
      date: null,
      eventId: null,
      groupId: null,
      accessToken: null
    };
  },
  async asyncData(context: Context) {
    const accessToken = context.app.$cookies.get('accessToken');
    const { eventId } = context.params;
    const { groupId } = context.query;

    await context.store.dispatch('event/getEvent', {
      accessToken,
      eventId
    });

    const { title, description, date } = context.store.state.event;

    return {
      title,
      description,
      date,
      eventId,
      groupId,
      accessToken
    };
  },
  methods: {
    async onSubmit() {
      const { eventId, title, description, date, accessToken } = this;

      await this.$store.dispatch('event/updateEvent', {
        eventId,
        title,
        description,
        date,
        accessToken
      });

      this.$router.push(`/events/${eventId}`);
    }
  }
});
</script>
