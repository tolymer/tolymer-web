<template>
  <section>
    <h2>New User</h2>
    <CreateUser />
  </section>
</template>

<script>
  import CreateUser from '~/components/CreateUser'

  export default {
    components: {
      CreateUser
    },
    async fetch(context) {
      const { accessToken } = context.cookie

      if (accessToken) {
        context.redirect('/')
      }
    }
  }
</script>
