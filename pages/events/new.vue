<template>
  <section>
    <h2>New Event</h2>
    <CreateEvent />
  </section>
</template>

<script>
  import CreateEvent from '~/components/CreateEvent'

  export default {
    components: {
      CreateEvent
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

        await context.store.dispatch('loggedIn')

        await context.store.dispatch('getCurrentUser', {
          accessToken
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
