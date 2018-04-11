<template>
  <section>
    <h2>{{ name }}</h2>
    <p>id: {{ id }}</p>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: ["auth"],
  computed: mapState({
    id: state => state.user.id,
    name: state => state.user.name
  }),
  async fetch(context) {
    try {
      const { userId } = context.params;

      await context.store.dispatch("user/getUser", {
        userId
      });
    } catch (e) {
      context.error({
        message: "Not found",
        statusCode: 404
      });
    }
  }
};
</script>
