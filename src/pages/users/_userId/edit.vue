<template>
  <section>
    <Header />
    <FormContainer @submit.prevent="onSubmit">
      <BaseInput
        v-model="name"
        type="text"
        label="名前"
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
import { userModule } from '~/store/modules/user';
import Header from '~/components/Header.vue';
import FormContainer from '~/components/FormContainer.vue';
import BaseInput from '~/components/BaseInput.vue';
import BaseButton from '~/components/BaseButton.vue';

export default Vue.extend({
  components: {
    Header,
    FormContainer,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      name: null
    };
  },
  async asyncData({ params, store }: Context) {
    const userState = userModule.context(store);

    await userState.actions.getUser({
      userId: params.userId
    });

    return {
      name: userState.getters.name
    };
  },
  methods: {
    async onSubmit() {
      const userState = userModule.context(this.$store);

      await userState.actions.updateUser({
        userId: this.$route.params.userId,
        name: this.name
      });

      this.$router.push('/');
    }
  }
});
</script>
