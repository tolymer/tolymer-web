<template>
  <section>
    <Menu />
    <Me />
    <h2>Event</h2>
    <p>title: {{ title }}</p>
    <p>description: {{ description }}</p>
    <p>date: {{ date }}</p>
    <h3>Event Members</h3>
    <ul>
      <li
        v-for="(member, index) in members"
        :key="index">
        <router-link :to="userLink(member.id)">
          {{ member.name }}
        </router-link>
      </li>
    </ul>
    <h3>Event Games</h3>
    <ul>
      <li
        v-for="(game, index) in games"
        :key="index">
        <ul>
          <li
            v-for="(score, index) in game.scores"
            :key="index">
            {{ score.id }}:{{ score.point }}
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import Menu from '~/components/Menu'
  import Me from '~/components/Me'

  export default {
    components: {
      Menu,
      Me
    },
    computed: mapState({
      title: state => state.event.title,
      description: state => state.event.description,
      date: state => state.event.date
    }),
    methods: {
      userLink(id) {
        return `/users/${id}`
      }
    },
    async fetch(context) {
      const { accessToken } = context.cookie

      if (!accessToken) {
        context.redirect('/')
      }
    },
    async asyncData(context) {
      try {
        const { accessToken } = context.cookie
        const { eventId } = context.params

        await context.store.dispatch('event/getAll', {
          eventId,
          accessToken
        })

        await context.store.dispatch('me/getAll', {
          accessToken
        })

        await context.store.dispatch('loggedIn')
      } catch (e) {
        context.error({
          message: 'Not found',
          statusCode: 404
        })
      }
    }
  }
</script>
