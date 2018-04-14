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
import { parse } from "cookie";
import Header from '~/components/Header';
import BaseInput from '~/components/BaseInput';
import BaseButton from '~/components/BaseButton';

export default {
  middleware: ["auth"],
  components: {
    Header,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      name: "",
      description: ""
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const { accessToken } = parse(document.cookie);

      await this.$store.dispatch("group/createGroup", {
        name: this.name,
        description: this.description,
        accessToken
      });

      this.name = "";
      this.description = "";
    }
  }
};
</script>
