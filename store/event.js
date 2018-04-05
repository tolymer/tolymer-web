import axios from '~/plugins/axios'

export const state = () => ({
  title: '',
  description: '',
  date: '',
  members: [],
  games: []
})

export const mutations = {
  createEvent() {},
  getEvent(state, payload) {
    state.title = payload.title
    state.description = payload.description
    state.date = payload.date
  },
  getEventMembers(state, payload) {
    state.members = payload
  },
  getEventGames(state, payload) {
    state.games = payload
  }
}

export const actions = {
  async createEvent({ commit }, { title, description, date, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const event = await axios.post(`/events`, {
        title,
        description,
        date
      }, config)

      commit('createEvent', event.data)
    } catch (e) {
      console.error(e)
    }
  },
  async createGroupEvent({ commit }, { groupId, title, description, date, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const event = await axios.post(`/groups/${groupId}/events`, {
        title,
        description,
        date
      }, config)

      commit('createEvent', event.data)
    } catch (e) {
      console.error(e)
    }
  },
  async getEvent({ commit }, { eventId, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const event = await axios.get(`/events/${eventId}`, config)
      const eventMembers = await axios.get(`/events/${eventId}/members`, config)
      const eventGames = await axios.get(`/events/${eventId}/events`, config)

      commit('getEvent', event.data)
      commit('getEventMembers', eventMembers.data)
      commit('getEventGames', eventGames.data)
    } catch (e) {
      console.error(e)
    }
  }
}
