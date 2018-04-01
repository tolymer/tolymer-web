import axios from 'axios'

export const state = () => ({})

export const mutations = {
  new(state) {},
  login(state) {},
  logout(state) {}
}

export const actions = {
  async new({ commit }, { name, password }) {
    try {
      await axios.post(`/api/new`, {
        name,
        password
      })

      commit('new')
    } catch (e) {
      console.error(e)
    }
  },
  async login({ commit }, { name, password }) {
    try {
      await axios.post(`/api/login`, {
        auth: {
          name,
          password
        }
      })

      commit('login')
    } catch (e) {
      console.error(e)
    }
  },
  async logout({ commit }) {
    try {
      commit('logout')
    } catch (e) {
      console.error(e)
    }
  }
}
