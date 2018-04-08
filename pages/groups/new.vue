<template>
  <section>
    <h2>グループを作成する</h2>
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
