<template>
  <section>
    <h1>Index</h1>
    <Me />
    <Menu />
  </section>
</template>

<script>
  import Me from '~/components/Me'
  import Menu from '~/components/Menu'

  export default {
    components: {
      Me,
      Menu
    },
    async asyncData(context) {
      const { accessToken } = context.cookie

      if (!accessToken) {
        return
      }

      await context.store.dispatch('me/getAll', {
        accessToken
      })
    }
  }
</script>
