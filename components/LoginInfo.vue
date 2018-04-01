<template>
  <section>
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState({
      id: state => state.user.currentUser.id,
      name: state => state.user.currentUser.name
    })
  }
</script>
