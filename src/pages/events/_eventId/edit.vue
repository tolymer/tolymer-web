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
import { eventModule } from '~/store/modules/event';
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
    const eventState = eventModule.context(store);

    await eventState.actions.getEvent({
      eventId: params.eventId
    });

    return {
      title: eventState.getters.title,
      description: eventState.getters.description,
      date: eventState.getters.date,
      eventId: params.eventId,
      groupId: query.groupId
    };
  },
  methods: {
    async onSubmit() {
      const eventState = eventModule.context(this.$store);
      const { eventId } = this.$route.params;

      await eventState.actions.updateEvent({
        eventId,
        title: this.title,
        description: this.description,
        date: this.date
      });

      this.$router.push(`/events/${eventId}`);
    }
  }
});
</script>
