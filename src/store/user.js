import axios from '~/plugins/axios';

export const state = () => ({
  id: '',
  name: ''
});

export const mutations = {
  createUser() {},
  getUser(state, payload) {
    state.name = payload.name;
  },
  updateUser(state, payload) {
    state.name = payload.name;
  }
};

export const actions = {
  async createUser({ commit }, { name }) {
    try {
      const data = { name };
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
  },
  async updateUser({ commit }, { userId, name }) {
    try {
      const data = { name };
      const user = await axios.patch(`/users/${userId}`, data);

      commit('updateUser', user.data);
    } catch (e) {
      console.error(e);
    }
  }
};
