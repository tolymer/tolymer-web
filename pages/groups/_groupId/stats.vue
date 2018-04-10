<template>
  <div>{{ groupId }} stats</div>
</template>

<script>
  export default {
    data() {
      return {
        groupId: ''
      }
    },
    async asyncData(context) {
      const { groupId } = context.params

      return {
        groupId
      }
    },
  };
</script>
