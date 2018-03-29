import axios from 'axios'

export const state = () => ({
  jwt: ''
})

export const mutations = {
  login(state, jwt) {
    state.jwt = jwt
  }
}

export const actions = {
  async login({ commit, state }, { name, password }) {
    try {
      const { data } = await axios.post(`http://localhost:3000/user_token`, {
        auth: {
          name,
          password
        }
      })

      commit('login', data.jwt)
    } catch (e) {
      console.error(e)
    }
  }
}
