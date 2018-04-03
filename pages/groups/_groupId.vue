<template>
  <section>
    <h1>Group</h1>
    <Me />
    <Menu />
    <h2>{{ name }}</h2>
    <p>description: {{ description }}</p>
    <h2>Members</h2>
    <ul>
      <li
        v-for="(member, index) in members"
        :key="index">
        <h3>
          <router-link :to="userLink(member.id)">
            {{ member.name }}
          </router-link>
        </h3>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import Me from '~/components/Me'
  import Menu from '~/components/Menu'

  export default {
    components: {
      Me,
      Menu
    },
    computed: mapState({
      id: state => state.group.id,
      name: state => state.group.name,
      description: state => state.group.description,
      members: state => state.group.members
    }),
    methods: {
      userLink(id) {
        return `/users/${id}`
      }
    },
    async asyncData(context) {
      try {
        const { accessToken } = context.cookie
        const { groupId } = context.params

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
