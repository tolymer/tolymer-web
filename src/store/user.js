import axios from '~/plugins/axios';

export const state = () => ({
  id: '',
  name: ''
});

export const mutations = {
  createUser() {},
  getUser(state, payload) {
    state.id = payload.id;
    state.name = payload.name;
  }
};

export const actions = {
  async createUser({ commit }, { name, password }) {
    try {
      const data = { name, password };
      const user = await axios.post('/users', data);

      commit('createUser', user.data);
    } catch (e) {
      console.error(e);
    }
  },
  async getUser({ commit }, { userId }) {
    try {
      const user = await axios.get(`/users/${userId}`);

      commit('getUser', user.data);
    } catch (e) {
      console.error(e);
    }
  }
};
