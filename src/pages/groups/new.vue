<template>
  <section>
    <Header/>
    <form
      class="FormContainer"
      @submit="onSubmit">
      <BaseInput
        v-model="name"
        label="グループ名" />
      <BaseInput
        v-model="description"
        label="グループ" />
      <BaseButton type="submit">
        登録
      </BaseButton>
    </form>
  </section>
</template>

<script>
import Header from '~/components/Header';
import BaseInput from '~/components/BaseInput';
import BaseButton from '~/components/BaseButton';

export default {
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
  async asyncData(context) {
    const { accessToken } = context.cookie;

    return {
      accessToken
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const { name, description, accessToken } = this;

      await this.$store.dispatch('group/createGroup', {
        name,
        description,
        accessToken
      });

      const groupId = this.$store.state.group.id;

      this.$router.push(`/groups/${groupId}`);
    }
  }
};
</script>
