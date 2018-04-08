<template>
  <section>
    <h2>New Event</h2>
    <CreateEvent />
  </section>
</template>

<script>
  import CreateEvent from '~/components/CreateEvent'

  export default {
    middleware: ['auth'],
    components: {
      CreateEvent
    }
  }
</script>
