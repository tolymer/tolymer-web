<template>
  <section>
    <h1>New Event</h1>
    <Menu />
    <CreateEvent />
  </section>
</template>

<script>
  import Menu from '~/components/Menu'
  import CreateEvent from '~/components/CreateEvent'

  export default {
    components: {
      Menu,
      CreateEvent
    }
  }
</script>
