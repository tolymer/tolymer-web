<template>
  <section>
    <h1>Event</h1>
    <LoginInfo />
    <Menu />
    <p>title: {{ title }}</p>
    <p>description: {{ description }}</p>
    <p>date: {{ date }}</p>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import Menu from '~/components/Menu'

  export default {
    components: {
      Menu
    },
    computed: mapState({
      title: state => state.event.title,
      description: state => state.event.description,
      date: state => state.event.date
    }),
    async asyncData(context) {
      try {
        const { eventId } = context.params

        await context.store.dispatch('event/getEvent', {
          eventId
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
