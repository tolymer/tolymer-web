<template>
  <section class="container">
    <ul>
      <li
        v-for="(user, index) in users"
        v-bind:index="index"
        v-bind:key="index"
      >
        id: {{ user.id }}
        name: {{ user.name }}
      </li>
    </ul>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        users: []
      }
    }
  }
</script>
