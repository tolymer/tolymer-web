<template>
  <section>
    <h1>User</h1>
    <Menu />
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
  </section>
</template>

<script>
  import axios from 'axios'
  import Menu from '~/components/Menu'

  export default {
    data () {
      return {
        id: '',
        name: ''
      }
    },
    async asyncData(context) {
      try {
        const { name } = context.params
        const { jwt } = context.store.state

        const { data } = await axios.get(`http://localhost:3000/users/${name}`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })

        return data
      } catch (e) {
        context.error({
          message: 'Not found',
          statusCode: 404
        })
      }
    }
  }
</script>
