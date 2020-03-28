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
import { Context } from '@nuxt/types';
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
      date: null
    };
  },
  async asyncData({ params, query, store }: Context) {
    await store.dispatch('event/getEvent', {
      eventId: params.eventId
    });

    const { title, description, date } = store.state.event;

    return {
      title,
      description,
      date,
      eventId: params.eventId,
      groupId: query.groupId
    };
  },
  methods: {
    async onSubmit() {
      const { eventId } = this.$route.params;
      const { title, description, date } = this;

      await this.$store.dispatch('event/updateEvent', {
        eventId,
        title,
        description,
        date
      });

      this.$router.push(`/events/${eventId}`);
    }
  }
});
</script>
