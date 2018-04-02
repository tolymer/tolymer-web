import axios from '~/plugins/axios'

export const state = () => ({
  user: {
    id: '',
    name: ''
  },
  groups: []
})

export const mutations = {
  getUser(state, payload) {
    state.user.id = payload.id
    state.user.name = payload.name
  },
  getGroups(state, payload) {
    state.groups = payload.groups
  },
}

export const actions = {
  async getAll({ commit }, { accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const user = await axios.get('/current_user', config)
      const userGroups = await axios.get('/current_user/groups', config)

      commit('getUser', user.data)
      commit('getGroups', userGroups.data)
    } catch (e) {
      console.error(e)
    }
  }
}
