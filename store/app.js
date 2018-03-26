import axios from 'axios'

export const state = () => ({
  id: '',
  password: '',
  token: ''
})

export const mutations = {}

export const actions = {
  async login({ state, commit }, name, password) {
    if (name === '') {
      return
    }

    if (password === '') {
      return
    }

    const result = await axios.post('http://localhost:3000/user_token', {
      params: {
        name,
        password
      }
    })

    console.log(result)
  }
}
