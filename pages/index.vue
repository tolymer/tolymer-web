<template>
  <section>
    <Menu />
    <Me />
  </section>
</template>

<script>
  import Menu from '~/components/Menu'
  import Me from '~/components/Me'

  export default {
    components: {
      Menu,
      Me
    },
    async asyncData(context) {
      try {
        const { accessToken } = context.cookie

        if (!accessToken) {
          return
        }

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
