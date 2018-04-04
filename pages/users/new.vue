<template>
  <section>
    <h1>New User</h1>
    <Menu />
    <CreateUser />
  </section>
</template>

<script>
  import Menu from '~/components/Menu'
  import CreateUser from '~/components/CreateUser'

  export default {
    components: {
      Menu,
      CreateUser
    }
  }
</script>
