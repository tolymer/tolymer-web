<template>
  <section>
    <Header/>
    <FormContainer @submit="onSubmit">
      <BaseInput
        v-model="name"
        label="グループ名" />
      <BaseInput
        v-model="description"
        label="グループ" />
      <BaseButton type="submit">
        登録
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
    const { groupId } = context.params;

    await context.store.dispatch('group/getGroup', {
      groupId,
      accessToken
    });

    const {
      name,
      description
    } = context.store.state.group;

    return {
      groupId,
      name,
      description,
      accessToken
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const {
        groupId,
        name,
        description,
        accessToken
      } = this;

      await this.$store.dispatch('group/updateGroup', {
        groupId,
        name,
        description,
        accessToken
      });
    }
  }
};
</script>
