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
import { groupModule } from '~/store/modules/group';
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
    const groupState = groupModule.context(store);

    await groupState.actions.getGroup(params.groupId);

    return {
      name: groupState.getters.name,
      description: groupState.getters.description
    };
  },
  methods: {
    async onSubmit() {
      const groupState = groupModule.context(this.$store);
      const { groupId } = this.$route.params;

      await groupState.actions.updateGroup({
        id: groupId,
        name: this.name,
        description: this.description
      });

      this.$router.push(`/groups/${groupId}`);
    }
  }
});
</script>
