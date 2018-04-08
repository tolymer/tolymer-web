<template>
  <section>
    <h2>New Group</h2>
    <CreateGroup />
  </section>
</template>

<script>
  import CreateGroup from '~/components/CreateGroup'

  export default {
    middleware: ['auth'],
    components: {
      CreateGroup
    }
  }
</script>
