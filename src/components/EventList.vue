<template>
  <ul class="EventList">
    <li
      v-for="(event, index) in events"
      :key="index"
      class="EventList__Item"
    >
      <router-link
        :to="eventLink(event.id)"
        class="EventList__Link"
      >
        <h2>{{ event.title }}</h2>
        <p>
          <time>{{ event.date }}</time>
          {{ event.description }}
        </p>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    events: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    eventLink(id) {
      return `/events/${id}`;
    }
  }
});
</script>

<style scoped>
.EventList {
  margin: 0;
  padding: 0;
  list-style-type: none;
  border: 1px solid var(--color-gray);
}

.EventList__Item {
  display: flex;
}

.EventList__Item:not(:last-child) {
  border-bottom: 1px solid var(--color-gray);
}

.EventList__Item h2 {
  margin: 0;
  margin-bottom: var(--space-base);
  font-size: 1.8rem;
}

.EventList__Item p {
  margin: 0;
  font-size: 1.4rem;
}

.EventList__Link {
  width: 100%;
  padding: calc(var(--space-base) * 2);
  text-decoration: none;
  color: var(--color-black);
}
</style>
