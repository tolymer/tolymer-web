<template>
  <section>
    <h2>{{ name }}</h2>
    <p>id: {{ id }}</p>
    <h2>Groups</h2>
    <ul>
      <li
        v-for="(group, index) in groups"
        :key="index">
        <h3>
          <router-link :to="groupLink(group.id)">
            {{ group.name }}
          </router-link>
        </h3>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState({
      id: state => state.me.id,
      name: state => state.me.name,
      groups: state => state.me.groups
    }),
    methods: {
      groupLink(id) {
        return `/groups/${id}`
      }
    }
  }
</script>
