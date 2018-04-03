import axios from '~/plugins/axios'

export const state = () => ({
  title: '',
  description: '',
  date: ''
})

export const mutations = {
  createEvent() {},
  getEvent(state, payload) {
    state.title = payload.title
    state.description = payload.description
    state.date = payload.date
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
  async getEvent({ commit }, { eventId, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }

      const event = await axios.get(`/events/${eventId}`, config)

      commit('getEvent', event.data)
    } catch (e) {
      console.error(e)
    }
  }
}
