<template>
  <section>
    <h1>Group</h1>
    <LoginInfo />
    <Menu />
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
    <p>description: {{ description }}</p>
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
      id: state => state.group.group.id,
      name: state => state.group.group.name,
      description: state => state.group.group.description
    }),
    async asyncData(context) {
      try {
        const { accessToken } = context.cookie
        const { groupId } = context.params

        await context.store.dispatch('group/getGroup', {
          accessToken,
          groupId
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
