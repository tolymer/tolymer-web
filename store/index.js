import axios from '~/plugins/axios'

export const state = () => ({})

export const mutations = {
  login() {},
  logout() {}
}

export const actions = {
  async login({ commit }, { name, password }) {
    try {
      await axios.post('/user_token', {
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
