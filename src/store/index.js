import axios from '~/plugins/axios';
import axiosConfig from '~/plugins/axiosConfig';

export const state = () => ({
  isLoggedIn: false,
  id: '',
  name: '',
  groups: []
});

export const mutations = {
  login() {},
  loginCallback(state) {
    state.isLoggedIn = true;
  },
  logout(state) {
    state.isLoggedIn = false;
  },
  getCurrentUser(state, payload) {
    state.id = payload.id;
    state.name = payload.name;
    state.groups = payload.groups;
  },
  deleteCurrentUser(state) {
    state.id = '';
    state.name = '';
    state.groups = [];
  }
};

export const actions = {
  async loggedIn({ commit }) {
    commit('login');
  },
  async login({ commit }) {
    try {
      await axios.get('/auth/google');

      commit('login');
    } catch (e) {
      console.error(e);
    }
  },
  async loginCallback({ commit }, { code }) {
    try {
      const params = { code };
      const config = { params };
      await axios.get('/auth/google/callback', config);

      commit('loginCallback');
    } catch (e) {
      console.error(e);
    }
  },
  async logout({ commit }) {
    commit('logout');
  },
  async getCurrentUser({ commit }, { accessToken }) {
    try {
      const config = axiosConfig(accessToken);
      const user = await axios.get('/current_user', config);
      const userGroups = await axios.get('/current_user/groups', config);
      const payload = Object.assign({}, user.data, {
        groups: userGroups.data
      });

      commit('getCurrentUser', payload);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteCurrentUser({ commit }) {
    commit('deleteCurrentUser');
  }
};
