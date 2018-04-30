import axios from '~/plugins/axios';
import axiosConfig from '~/plugins/axiosConfig';

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
  async createGroup({ commit }, { name, description, accessToken }) {
    try {
      const data = { name, description };
      const config = axiosConfig(accessToken);
      const group = await axios.post(`/groups`, data, config);

      commit('createGroup', group.data);
    } catch (e) {
      console.error(e);
    }
  },
  async getGroup({ commit }, { groupId, accessToken }) {
    try {
      const config = axiosConfig(accessToken);
      const group = await axios.get(`/groups/${groupId}`, config);
      const groupMembers = await axios.get(`/groups/${groupId}/members`, config);
      const groupEvents = await axios.get(`/groups/${groupId}/events`, config);

      commit('getGroup', group.data);
      commit('getGroupMembers', groupMembers.data);
      commit('getGroupEvents', groupEvents.data);
    } catch (e) {
      console.error(e);
    }
  },
  async updateGroup({ commit }, { groupId, name, description, accessToken }) {
    try {
      const data = { name, description };
      const config = axiosConfig(accessToken);
      const group = await axios.patch(`/groups/${groupId}`, data, config);

      commit('updateGroup', group.data);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteGroup({ commit }, { groupId, accessToken }) {
    try {
      const config = axiosConfig(accessToken);
      await axios.delete(`/groups/${groupId}`, {}, config);

      commit('deleteGroup');
    } catch (e) {
      console.error(e);
    }
  },
  async addGroupMembers({ commit }, { groupId, accessToken }) {
    try {
      const config = axiosConfig(accessToken);
      await axios.post(`/groups/${groupId}/members`, {}, config);

      commit('addGroupMembers');
    } catch (e) {
      console.error(e);
    }
  },
  async getStats({ commit }, { groupId, accessToken }) {
    try {
      const config = axiosConfig(accessToken);
      const stats = await axios.get(`/groups/${groupId}/stats`, config);

      commit('getStats', stats.data);
    } catch (e) {
      console.error(e);
    }
  }
};
