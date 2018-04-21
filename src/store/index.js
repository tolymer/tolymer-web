import axios from '~/plugins/axios';
import axiosConfig from '~/plugins/axiosConfig';

export const state = () => ({
  isLoggedIn: false,
  id: '',
  name: '',
  groups: []
});

export const mutations = {
  login(state) {
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
  async login({ commit }, { name, password }) {
    try {
      await axios.post('/user_token', {
        auth: {
          name,
          password
        }
      });

      commit('login');
    } catch (e) {
      console.error(e);
    }
  },
  async logout({ commit }) {
    commit('logout');
  },
  async getCurrentUser({ commit }, { accessToken }) {
    const config = axiosConfig(accessToken);
    const user = await axios.get('/current_user', config);
    const userGroups = await axios.get('/current_user/groups', config);

    commit(
      'getCurrentUser',
      Object.assign({}, user.data, {
        groups: userGroups.data
      })
    );
  },
  async deleteCurrentUser({ commit }) {
    commit('deleteCurrentUser');
  }
};
