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
      const url = process.server ?
        `http://localhost:3000/users/${userId}`:
        `/api/users/${userId}`
      const { data } = await axios.get(url)

      commit('getUser', data)
    } catch (e) {
      console.error(e)
    }
  },
  async getCurrentUser({ commit }, { accessToken }) {
    try {
      const url = process.server ?
        'http://localhost:3000/current_user':
        '/api/current_user'
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      commit('getCurrentUser', data)
    } catch (e) {
      console.error(e)
    }
  }
}
