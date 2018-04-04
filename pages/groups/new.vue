<template>
  <section>
    <h1>New Group</h1>
    <Menu />
    <CreateGroup />
  </section>
</template>

<script>
  import Menu from '~/components/Menu'
  import CreateGroup from '~/components/CreateGroup'

  export default {
    components: {
      Menu,
      CreateGroup
    }
  }
</script>
