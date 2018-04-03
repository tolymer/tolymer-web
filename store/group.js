import axios from '~/plugins/axios'

export const state = () => ({
  id: '',
  name: '',
  description: '',
  members: []
})

export const mutations = {
  createGroup() {},
  getGroup(state, payload) {
    state.id = payload.id
    state.name = payload.name
    state.description = payload.description
  },
  getGroupMembers(state, payload) {
    state.members = payload
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
      const groupMembers = await axios.get(`/groups/${groupId}/members`, config)

      commit('getGroup', group.data)
      commit('getGroupMembers', groupMembers.data)
    } catch (e) {
      console.error(e)
    }
  }
}
