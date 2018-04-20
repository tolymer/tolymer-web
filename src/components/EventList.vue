<template>
  <ul class="EventList">
    <li
      v-for="(event, index) in events"
      :key="index"
      class="EventList__Item">
      <router-link
        :to="eventLink(event.id)"
        class="EventList__Link">
        <time>{{ event.date }}</time>
        <h2>{{ event.title }}</h2>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
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
};
</script>

<style>
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

.EventList__Item time {
  font-size: 1.6rem;
}

.EventList__Item h2 {
  margin: 0;
  margin-top: var(--space-base);
  font-size: 1.8rem;
}

.EventList__Link {
  width: 100%;
  padding: calc(var(--space-base) * 2);
  text-decoration: none;
  color: var(--color-black);
}
</style>
