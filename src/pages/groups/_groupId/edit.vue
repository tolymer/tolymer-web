<template>
  <section>
    <Header />
    <FormContainer @submit.prevent="onSubmit">
      <BaseInput
        v-model="name"
        label="グループ名"
      />
      <BaseInput
        v-model="description"
        label="グループ概要"
      />
      <div slot="action">
        <BaseButton
          type="submit"
          kind="primary"
        >
          登録
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
      name: '',
      description: ''
    };
  },
  async asyncData({ params, store }: Context) {
    await store.dispatch('group/getGroup', {
      groupId: params.groupId
    });

    const { name, description } = store.state.group;

    return {
      name,
      description
    };
  },
  methods: {
    async onSubmit() {
      const { groupId } = this.$route.params;
      const { name, description } = this;

      await this.$store.dispatch('group/updateGroup', {
        groupId,
        name,
        description
      });

      this.$router.push(`/groups/${groupId}`);
    }
  }
});
</script>
