<template>
  <section>
    <Header />
    <form
      class="FormContainer"
      @submit.prevent="onSubmit"
    >
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
    </form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/Header.vue';
import BaseInput from '~/components/BaseInput.vue';
import BaseButton from '~/components/BaseButton.vue';

export default Vue.extend({
  middleware: ['auth'],
  components: {
    Header,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      name: '',
      description: ''
    };
  },
  methods: {
    async onSubmit() {
      const { name, description } = this;

      await this.$store.dispatch('group/createGroup', {
        name,
        description
      });

      const groupId = this.$store.state.group.id;

      this.$router.push(`/groups/${groupId}`);
    }
  }
});
</script>
