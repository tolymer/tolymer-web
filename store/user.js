import axios from '~/plugins/axios'

export const state = () => ({
  user: {
    id: '',
    name: ''
  }
})

export const mutations = {
  getUser(state, payload) {
    state.user.id = payload.id
    state.user.name = payload.name
  }
}

export const actions = {
  async getUser({ commit }, { userId }) {
    try {
      const user = await axios.get(`/users/${userId}`)

      commit('getUser', user.data)
    } catch (e) {
      console.error(e)
    }
  }
}
