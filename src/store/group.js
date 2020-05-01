export const state = () => ({
  id: '',
  name: '',
  description: '',
  members: [],
  events: [],
  stats: []
});

export const mutations = {
  createGroup(state, payload) {
    state.id = payload.id;
    state.name = payload.name;
    state.description = payload.description;
  },
  getGroup(state, payload) {
    state.id = payload.id;
    state.name = payload.name;
    state.description = payload.description;
  },
  updateGroup(state, payload) {
    state.name = payload.name;
    state.description = payload.description;
  },
  deleteGroup(state) {
    state.name = '';
    state.description = '';
  },
  getGroupMembers(state, payload) {
    state.members = payload;
  },
  getGroupEvents(state, payload) {
    state.events = payload;
  },
  addGroupMembers() {},
  getStats(state, payload) {
    state.stats = payload;
  }
};

export const actions = {
  async createGroup({ commit }, { name, description }) {
    try {
      const data = { name, description };
      const group = await this.$axios.post(`/groups`, data, {});

      commit('createGroup', group.data);
    } catch (e) {
      console.error(e);
    }
  },
  async getGroup({ commit }, { groupId }) {
    try {
      const group = await this.$axios.get(`/groups/${groupId}`);
      const groupMembers = await this.$axios.get(`/groups/${groupId}/members`);
      const groupEvents = await this.$axios.get(`/groups/${groupId}/events`);

      commit('getGroup', group.data);
      commit('getGroupMembers', groupMembers.data);
      commit('getGroupEvents', groupEvents.data);
    } catch (e) {
      console.error(e);
    }
  },
  async updateGroup({ commit }, { groupId, name, description }) {
    try {
      const data = { name, description };
      const group = await this.$axios.patch(`/groups/${groupId}`, data);

      commit('updateGroup', group.data);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteGroup({ commit }, { groupId }) {
    try {
      await this.$axios.delete(`/groups/${groupId}`);

      commit('deleteGroup');
    } catch (e) {
      console.error(e);
    }
  },
  async addGroupMembers({ commit }, { groupId }) {
    try {
      await this.$axios.post(`/groups/${groupId}/members`, {});

      commit('addGroupMembers');
    } catch (e) {
      console.error(e);
    }
  },
  async getStats({ commit }, { groupId }) {
    try {
      const stats = await this.$axios.get(`/groups/${groupId}/stats`);

      commit('getStats', stats.data);
    } catch (e) {
      console.error(e);
    }
  }
};
