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
      <BaseButton type="submit">
        更新
      </BaseButton>
    </FormContainer>
  </section>
</template>

<script>
import { parse } from 'cookie';
import { format } from 'date-fns';
import Header from '~/components/Header';
import FormContainer from '~/components/FormContainer';
import BaseInput from '~/components/BaseInput';
import BaseButton from '~/components/BaseButton';

export default {
  middleware: ['auth'],
  components: {
    Header,
    FormContainer,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      title: '',
      description: '',
      date: format(Date.now(), 'YYYY-MM-DD'),
      eventId: null,
      groupId: null
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const { accessToken } = parse(document.cookie);
      const { eventId, title, description, date } = this;

      await this.$store.dispatch('event/updateEvent', {
        eventId,
        title,
        description,
        date,
        accessToken
      });
    }
  },
  async asyncData(context) {
    const { accessToken } = context.cookie;
    const { eventId } = context.params;
    const { groupId } = context.query;

    await context.store.dispatch('event/getEvent', {
      accessToken,
      eventId
    });

    return {
      title: context.store.state.event.title,
      description: context.store.state.event.description,
      date: context.store.state.event.date,
      eventId,
      groupId
    };
  }
};
</script>
