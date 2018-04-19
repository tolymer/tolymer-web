<template>
  <ul class="GroupList">
    <li
      v-for="(group, index) in groups"
      :key="index"
      class="GroupList__Item">
      <router-link
        :to="groupLink(group.id)"
        class="GroupList__Link">
        {{ group.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    groupLink(id) {
      return `/groups/${id}`;
    }
  }
}
</script>

<style>
.GroupList {
  margin: 0;
  padding: 0;
  list-style-type: none;
  border: 1px solid var(--color-gray);
}

.GroupList__Item {
  display: flex;
}

.GroupList__Item:not(:last-child) {
  border-bottom: 1px solid var(--color-gray);
}

.GroupList__Link {
  padding: calc(var(--space-base) * 2);
  width: 100%;
  color: var(--color-black);
  text-decoration: none;
}
</style>
