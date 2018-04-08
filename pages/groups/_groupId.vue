<template>
  <section>
    <h2>Group</h2>
    <p>name: {{ name }}</p>
    <p>description: {{ description }}</p>
    <h3>Group Members</h3>
    <ul>
      <li
        v-for="(member, index) in members"
        :key="index">
        <router-link :to="userLink(member.id)">
          {{ member.name }}
        </router-link>
      </li>
    </ul>
    <h3>Group Events</h3>
    <ul>
      <li
        v-for="(event, index) in events"
        :key="index">
        <router-link :to="eventLink(event.id)">
          {{ event.title }}
        </router-link>
      </li>
    </ul>
    <h3>Create Group Event</h3>
    <CreateGroupEvent :group-id="groupId" />
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import CreateGroupEvent from '~/components/CreateGroupEvent'

  export default {
    middleware: ['auth'],
    components: {
      CreateGroupEvent
    },
    data() {
      return {
        groupId: ''
      }
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
        return `/users/${id}`
      },
      eventLink(id) {
        return `/events/${id}`
      }
    },
    async asyncData(context) {
      const { groupId } = context.params

      return {
        groupId
      }
    },
    async fetch(context) {
      try {
        const { accessToken } = context.cookie
        const { groupId } = context.params
        const { join } = context.query

        if (join) {
          await context.store.dispatch('group/addGroupMembers', {
            groupId,
            accessToken
          })
        }

        await context.store.dispatch('group/getGroup', {
          accessToken,
          groupId
        })
      } catch (e) {
        context.error({
          message: 'Not found',
          statusCode: 404
        })
      }
    }
  }
</script>
