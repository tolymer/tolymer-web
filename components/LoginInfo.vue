<template>
  <section>
    <h2>User</h2>
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
    <h2>Groups</h2>
    <ul>
      <li 
        v-for="(group, index) in groups" 
        :key="index">
        <h3>{{ group.name }}</h3>
        <p>{{ group.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState({
      id: state => state.me.user.id,
      name: state => state.me.user.name,
      groups: state => state.me.groups
    })
  }
</script>
