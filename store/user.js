import axios from '~/plugins/axios'

export const state = () => ({
  user: {
    id: '',
    name: ''
  }
})

export const mutations = {
  createUser() {},
  getUser(state, payload) {
    state.user.id = payload.id
    state.user.name = payload.name
  }
}

export const actions = {
  async createUser({ commit }, { name, password }) {
    try {
      const user = await axios.post('/users', {
        name,
        password
      })

      commit('createUser', user.data)
    } catch (e) {
      console.error(e)
    }
  },
  async getUser({ commit }, { userId }) {
    try {
      const user = await axios.get(`/users/${userId}`)

      commit('getUser', user.data)
    } catch (e) {
      console.error(e)
    }
  }
}
