import axios from 'axios'

export const state = () => ({
  id: '',
  name: ''
})

export const mutations = {
  getUser(state, payload) {
    state.id = payload.id
    state.name = payload.name
  }
}

export const actions = {
  async getUser({ commit }, { userId }) {
    try {
      let result;
      if (process.server) {
        result = await axios.get(`http://localhost:3000/users/${userId}`)
      } else {
        result = await axios.get(`/api/users/${userId}`)
      }

      commit('getUser', result.data)
    } catch (e) {
      console.error(e)
    }
  }
}
