export const state = () => ({
  location: '',
  isLoggedIn: false,
  id: '',
  name: '',
  groups: []
});

export const mutations = {
  loggedIn(state) {
    state.isLoggedIn = true;
  },
  login(state, payload) {
    state.location = payload.location;
  },
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
    commit('loggedIn');
  },
  async login({ commit }) {
    try {
      const authGoogle = await this.$axios.get('/auth/google');

      commit('login', authGoogle.data);
    } catch (e) {
      console.error(e);
    }
  },
  async loginCallback({ commit }, { code, state }) {
    try {
      const params = { code, state };
      const config = { params };
      await this.$axios.get('/auth/google/callback', config);

      commit('loginCallback');
    } catch (e) {
      console.error(e);
    }
  },
  async logout({ commit }) {
    commit('logout');
  },
  async getCurrentUser({ commit }) {
    try {
      const user = await this.$axios.get('/current_user');
      const userGroups = await this.$axios.get('/current_user/groups');
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
