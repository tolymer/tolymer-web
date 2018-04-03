<template>
  <section>
    <h1>User</h1>
    <LoginInfo />
    <Menu />
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
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
      id: state => state.user.id,
      name: state => state.user.name
    }),
    async asyncData(context) {
      try {
        const { userId } = context.params

        await context.store.dispatch('user/getUser', {
          userId
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
