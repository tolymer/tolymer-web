<template>
  <ul class="GroupList">
    <li
      v-for="(group, index) in groups"
      :key="index"
      class="GroupList__Item">
      <router-link
        :to="groupLink(group.id)"
        class="GroupList__Link">
        <h2>{{ group.name }}</h2>
        <p>{{ group.description }}</p>
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
};
</script>

<style scoped>
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

.GroupList__Item h2 {
  margin: 0;
  margin-bottom: var(--space-base);
  font-size: 1.8rem;
}

.GroupList__Item p {
  margin: 0;
  font-size: 1.4rem;
}

.GroupList__Link {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  padding: calc(var(--space-base) * 2);
  text-decoration: none;
  color: var(--color-black);
}
</style>
