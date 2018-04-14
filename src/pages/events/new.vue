<template>
  <section>
    <Header/>
    <form
      class="FormContainer"
      @submit="onSubmit">
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
      <ul>
        <li
          v-for="(member, index) in members"
          :key="index">
          <label>
            <input
              :value="member.id"
              v-model="userIds"
              type="checkbox"
              name="members">
            {{ member.name }}
          </label>
        </li>
      </ul>
      <BaseButton type="submit">
        イベント作成
      </BaseButton>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { parse } from "cookie";
import { format } from "date-fns";
import Header from "~/components/Header";
import BaseInput from "~/components/BaseInput";
import BaseButton from "~/components/BaseButton";

export default {
  middleware: ["auth"],
  components: {
    Header,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      title: "",
      description: "",
      date: format(Date.now(), "YYYY-MM-DD"),
      groupId: null,
      userIds: []
    };
  },
  computed: mapState({
    members: state => state.event.groupMembers
  }),
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const { accessToken } = parse(document.cookie);

      if (this.userIds.length !== 4) {
        return;
      }

      await this.$store.dispatch("event/createEvent", {
        title: this.title,
        description: this.description,
        date: this.date,
        accessToken
      });

      this.title = "";
      this.description = "";
      this.date = "";
    }
  },
  async asyncData(context) {
    const { groupId } = context.query;

    return {
      groupId
    };
  },
  async fetch(context) {
    const { accessToken } = context.cookie;
    const { groupId } = context.query;

    if (!groupId) {
      return;
    }

    await context.store.dispatch("event/getGroupMembers", {
      accessToken,
      groupId
    });
  }
};
</script>
