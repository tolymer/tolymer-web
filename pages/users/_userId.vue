<template>
  <section>
    <Menu />
    <Me />
    <h2>User</h2>
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
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
      id: state => state.user.id,
      name: state => state.user.name
    }),
    async asyncData(context) {
      try {
        const { accessToken } = context.cookie
        const { userId } = context.params

        if (!accessToken) {
          return
        }

        await context.store.dispatch('user/getUser', {
          userId
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
