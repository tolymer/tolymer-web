import axios from '~/plugins/axios';

export const state = () => ({
  title: '',
  description: '',
  date: '',
  members: [],
  games: [],
  groupMembers: []
});

export const mutations = {
  createEvent(state, payload) {
    state.title = payload.title;
    state.description = payload.description;
    state.date = payload.date;
  },
  getEvent(state, payload) {
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
  addEventGames() {}
};

export const actions = {
  async createEvent({ commit }, { title, description, date, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      const event = await axios.post(
        `/events`,
        {
          title,
          description,
          date
        },
        config
      );

      commit('createEvent', event.data);
    } catch (e) {
      console.error(e);
    }
  },
  async getEvent({ commit }, { eventId, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      const event = await axios.get(`/events/${eventId}`, config);
      const eventMembers = await axios.get(`/events/${eventId}/members`, config);
      const eventGames = await axios.get(`/events/${eventId}/games`, config);

      commit('getEvent', event.data);
      commit('getEventMembers', eventMembers.data);
      commit('getEventGames', eventGames.data);
    } catch (e) {
      console.error(e);
    }
  },
  async updateEvent({ commit }, { eventId, title, description, date, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      const event = await axios.patch(
        `/events/${eventId}`,
        {
          title,
          description,
          date
        },
        config
      );

      commit('updateEvent', event.data);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteEvent({ commit }, { eventId, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      const event = await axios.delete(
        `/events/${eventId}`,
        {},
        config
      );

      commit('deleteEvent', event.data);
    } catch (e) {
      console.error(e);
    }
  },
  async createGroupEvent({ commit }, { groupId, title, description, date, userIds, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      const event = await axios.post(
        `/groups/${groupId}/events`,
        {
          title,
          description,
          date
        },
        config
      );

      await axios.post(
        `/events/${event.data.id}/members`,
        {
          userIds
        },
        config
      );

      commit('createEvent', event.data);
    } catch (e) {
      console.error(e);
    }
  },
  async getGroupMembers({ commit }, { groupId, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      const groupMembers = await axios.get(`/groups/${groupId}/members`, config);

      commit('getGroupMembers', groupMembers.data);
    } catch (e) {
      console.error(e);
    }
  },
  async addEventMembers({ commit }, { eventId, userIds, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      await axios.post(
        `/events/${eventId}/members`,
        {
          userIds
        },
        config
      );

      commit('addEventMembers');
    } catch (e) {
      console.error(e);
    }
  },
  async addEventGames({ commit }, { eventId, scores, accessToken }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      await axios.post(
        `/events/${eventId}/games`,
        {
          scores
        },
        config
      );

      commit('addEventMembers');
    } catch (e) {
      console.error(e);
    }
  }
};
