import axios from '~/plugins/axios'

export const state = () => ({
  isLoggedIn: false
})

export const mutations = {
  login(state) {
    state.isLoggedIn = true
  },
  logout(state) {
    state.isLoggedIn = false
  }
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
