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
  async asyncData(context) {
    const { accessToken } = context.cookie;
    const { eventId } = context.params;
    const { groupId } = context.query;

    await context.store.dispatch('event/getEvent', {
      accessToken,
      eventId
    });

    const {
      title,
      description,
      date
    } = context.store.state.event;

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
    async onSubmit(e) {
      e.preventDefault();

      const {
        eventId,
        title,
        description,
        date,
        accessToken
      } = this;

      await this.$store.dispatch('event/updateEvent', {
        eventId,
        title,
        description,
        date,
        accessToken
      });
    }
  }
};
</script>
