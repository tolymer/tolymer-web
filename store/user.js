import axios from '~/plugins/axios'

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
      const { data } = await axios.get(`/users/${userId}`)

      commit('getUser', data)
    } catch (e) {
      console.error(e)
    }
  },
  async getCurrentUser({ commit }, { accessToken }) {
    try {
      const { data } = await axios.get('/current_user', {
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
