<template>
  <section>
    <Header/>
    <FormContainer @submit.prevent="onSubmit">
      <BaseInput
        v-model="name"
        label="グループ名" />
      <BaseInput
        v-model="description"
        label="グループ概要" />
      <div slot="action">
        <BaseButton
          type="submit"
          kind="primary">
          登録
        </BaseButton>
      </div>
    </FormContainer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
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
      groupId: '',
      name: '',
      description: '',
      accessToken: ''
    };
  },
  async asyncData(context) {
    const { accessToken } = context.cookie;
    const { groupId } = context.params;

    await context.store.dispatch('group/getGroup', {
      groupId,
      accessToken
    });

    const { name, description } = context.store.state.group;

    return {
      groupId,
      name,
      description,
      accessToken
    };
  },
  methods: {
    async onSubmit() {
      const { groupId, name, description, accessToken } = this;

      await this.$store.dispatch('group/updateGroup', {
        groupId,
        name,
        description,
        accessToken
      });

      this.$router.push(`/groups/${groupId}`);
    }
  }
});
</script>
