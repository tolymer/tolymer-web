<template>
  <section>
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
    <h3>{{ name }}のメンバー</h3>
    <ul>
      <li
        v-for="(member, index) in members"
        :key="index">
        <router-link :to="userLink(member.id)">
          {{ member.name }}
        </router-link>
      </li>
    </ul>
    <h3>{{ name }}のイベント</h3>
    <ul>
      <li
        v-for="(event, index) in events"
        :key="index">
        <router-link :to="eventLink(event.id)">
          {{ event.title }}
        </router-link>
      </li>
    </ul>
    <router-link :to="createGroupEventLink(groupId)">イベントを作成する</router-link>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: ["auth"],
  data() {
    return {
      groupId: ""
    };
  },
  computed: mapState({
    id: state => state.group.id,
    name: state => state.group.name,
    description: state => state.group.description,
    members: state => state.group.members,
    events: state => state.group.events
  }),
  methods: {
    userLink(id) {
      return `/users/${id}`;
    },
    eventLink(id) {
      return `/events/${id}`;
    },
    createGroupEventLink(id) {
      return `/events/new?groupId=${id}`;
    }
  },
  async asyncData(context) {
    const { groupId } = context.params;

    return {
      groupId
    };
  },
  async fetch(context) {
    try {
      const { accessToken } = context.cookie;
      const { groupId } = context.params;
      const { join } = context.query;

      if (join) {
        await context.store.dispatch("group/addGroupMembers", {
          groupId,
          accessToken
        });
      }

      await context.store.dispatch("group/getGroup", {
        accessToken,
        groupId
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
