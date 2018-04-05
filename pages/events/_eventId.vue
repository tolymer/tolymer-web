<template>
  <section>
    <Menu />
    <Me />
    <h2>Event</h2>
    <p>title: {{ title }}</p>
    <p>description: {{ description }}</p>
    <p>date: {{ date }}</p>
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
    async asyncData(context) {
      try {
        const { accessToken } = context.cookie
        const { eventId } = context.params

        if (!accessToken) {
          return
        }

        await context.store.dispatch('event/getEvent', {
          eventId,
          accessToken
        })

        await context.store.dispatch('me/getAll', {
          accessToken
        })

        await context.store.dispatch('loginAlready')
      } catch (e) {
        context.error({
          message: 'Not found',
          statusCode: 404
        })
      }
    }
  }
</script>
