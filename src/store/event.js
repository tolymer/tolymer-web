export const state = () => ({
  id: '',
  title: '',
  description: '',
  date: '',
  members: [],
  games: [],
  groupMembers: []
});

export const mutations = {
  createEvent(state, payload) {
    state.id = payload.id;
    state.title = payload.title;
    state.description = payload.description;
    state.date = payload.date;
  },
  getEvent(state, payload) {
    state.id = payload.id;
    state.title = payload.title;
    state.description = payload.description;
    state.date = payload.date;
  },
  updateEvent(state, payload) {
    state.title = payload.title;
    state.description = payload.description;
    state.date = payload.date;
  },
  deleteEvent(state) {
    state.id = '';
    state.title = '';
    state.description = '';
    state.date = '';
  },
  getEventMembers(state, payload) {
    state.members = payload;
  },
  getEventGames(state, payload) {
    state.games = payload;
  },
  getGroupMembers(state, payload) {
    state.groupMembers = payload;
  },
  addEventMembers() {},
  addEventGame() {},
  deleteEventGame() {}
};

export const actions = {
  async createEvent({ commit }, { title, description, date }) {
    try {
      const data = { title, description, date };
      const event = await this.$axios.post(`/events`, data);

      commit('createEvent', event.data);
    } catch (e) {
      console.error(e);
    }
  },
  async getEvent({ commit }, { eventId }) {
    try {
      const event = await this.$axios.get(`/events/${eventId}`);
      const eventMembers = await this.$axios.get(`/events/${eventId}/members`);
      const eventGames = await this.$axios.get(`/events/${eventId}/games`);

      commit('getEvent', event.data);
      commit('getEventMembers', eventMembers.data);
      commit('getEventGames', eventGames.data);
    } catch (e) {
      console.error(e);
    }
  },
  async updateEvent({ commit }, { eventId, title, description, date }) {
    try {
      const data = { title, description, date };
      const event = await this.$axios.patch(`/events/${eventId}`, data);

      commit('updateEvent', event.data);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteEvent({ commit }, { eventId }) {
    try {
      const event = await this.$axios.delete(`/events/${eventId}`);

      commit('deleteEvent', event.data);
    } catch (e) {
      console.error(e);
    }
  },
  async createGroupEvent({ commit }, { groupId, title, description, date }) {
    try {
      const data = { title, description, date };
      const event = await this.$axios.post(`/groups/${groupId}/events`, data);

      commit('createEvent', event.data);
    } catch (e) {
      console.error(e);
    }
  },
  async getGroupMembers({ commit }, { groupId, accessToken }) {
    try {
      const groupMembers = await this.$axios.get(`/groups/${groupId}/members`);

      commit('getGroupMembers', groupMembers.data);
    } catch (e) {
      console.error(e);
    }
  },
  async addEventMembers({ commit }, { eventId, userIds }) {
    try {
      const data = { userIds };
      await this.$axios.post(`/events/${eventId}/members`, data);

      commit('addEventMembers');
    } catch (e) {
      console.error(e);
    }
  },
  async addEventGame({ commit }, { eventId, scores }) {
    try {
      const data = { scores };
      await this.$axios.post(`/events/${eventId}/games`, data);

      commit('addEventGame');
    } catch (e) {
      console.error(e);
    }
  },
  async deleteEventGame({ commit }, { eventId, gameId }) {
    try {
      await this.$axios.post(`/events/${eventId}/games/${gameId}`);

      commit('deleteEventGame');
    } catch (e) {
      console.error(e);
    }
  }
};
