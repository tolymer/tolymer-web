<template>
  <section>
    <h1>User</h1>
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
      id: state => state.users.id,
      name: state => state.users.name
    }),
    async asyncData(context) {
      try {
        const { userId } = context.params

        await context.store.dispatch('users/getUser', {
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
