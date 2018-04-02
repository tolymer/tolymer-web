import axios from '~/plugins/axios'

export const state = () => ({
  group: {
    id: '',
    name: '',
    description: ''
  }
})

export const mutations = {
  createGroup() {},
  getGroup(state, payload) {
    state.group.id = payload.id
    state.group.name = payload.name
    state.group.description = payload.description
  }
}

export const actions = {
  async createGroup({ commit }, { name, description, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const group = await axios.post(`/groups`, {
        name,
        description
      }, config)

      await axios.post(`/groups/${group.data.id}/members`, {}, config)

      commit('createGroup', group.data)
    } catch (e) {
      console.error(e)
    }
  },
  async getGroup({ commit }, { groupId, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const group = await axios.get(`/groups/${groupId}`, config)

      commit('getGroup', group.data)
    } catch (e) {
      console.error(e)
    }
  }
}
