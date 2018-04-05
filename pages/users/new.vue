<template>
  <section>
    <Menu />
    <Me />
    <h2>New User</h2>
    <CreateUser />
  </section>
</template>

<script>
  import Menu from '~/components/Menu'
  import Me from '~/components/Me'
  import CreateUser from '~/components/CreateUser'

  export default {
    components: {
      Menu,
      Me,
      CreateUser
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
