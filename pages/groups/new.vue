<template>
  <section>
    <h2>New Group</h2>
    <CreateGroup />
  </section>
</template>

<script>
  import CreateGroup from '~/components/CreateGroup'

  export default {
    components: {
      CreateGroup
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
