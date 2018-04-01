import axios from 'axios'

export const state = () => ({
  user: {
    id: '',
    name: ''
  },
  currentUser: {
    id: '',
    name: ''
  }
})

export const mutations = {
  getUser(state, payload) {
    state.user.id = payload.id
    state.user.name = payload.name
  },
  getCurrentUser(state, payload) {
    state.currentUser.id = payload.id
    state.currentUser.name = payload.name
  },
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
  },
  async getCurrentUser({ commit }) {
    try {
      let result;
      if (process.server) {
        result = await axios.get(`http://localhost:3000/current_user`)
      } else {
        result = await axios.get(`/api/current_user`)
      }

      commit('getCurrentUser', result.data)
    } catch (e) {
      console.error(e)
    }
  }
}
