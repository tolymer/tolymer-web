<template>
  <section>
    <Menu />
    <Me />
    <h2>New Event</h2>
    <CreateEvent />
  </section>
</template>

<script>
  import Menu from '~/components/Menu'
  import Me from '~/components/Me'
  import CreateEvent from '~/components/CreateEvent'

  export default {
    components: {
      Menu,
      Me,
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
