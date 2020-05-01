import { Store } from 'vuex';
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { RootState } from './root';
import { Score } from '~/types/game';

export class EventState {
  id: string = '';
  title: string = '';
  description: string = '';
  date: string = '';
  members: any[] = [];
  games: any[] = [];
  groupMembers: any[] = [];
}

class EventGetters extends Getters<EventState> {
  get id(): string {
    return this.state.id;
  }
  get title(): string {
    return this.state.title;
  }
  get description(): string {
    return this.state.description;
  }
  get date(): string {
    return this.state.date;
  }
  get members(): any[] {
    return this.state.members;
  }
  get games(): any[] {
    return this.state.games;
  }
  get groupMembers(): any[] {
    return this.state.groupMembers;
  }
}

class EventMutations extends Mutations<EventState> {
  setEvent({ id, title, description, date }) {
    this.state.id = id;
    this.state.title = title;
    this.state.description = description;
    this.state.date = date;
  }
  setEventMembers(payload) {
    this.state.members = payload;
  }
  setEventGames(payload) {
    this.state.games = payload;
  }
  setGroupMembers(payload) {
    this.state.groupMembers = payload;
  }
}

class EventActions extends Actions<EventState, EventGetters, EventMutations> {
  store: Store<RootState> | null = null;
  $init(store: Store<RootState>): void {
    this.store = store;
  }
  async createEvent({ title, description, date }) {
    try {
      const data = { title, description, date };
      const event = await this.store.$axios.post(`/events`, data);

      this.mutations.setEvent(event.data);
    } catch (e) {
      console.error(e);
    }
  }
  async getEvent({ eventId }) {
    try {
      const event = await this.store.$axios.get(`/events/${eventId}`);
      const eventMembers = await this.store.$axios.get(`/events/${eventId}/members`);
      const eventGames = await this.store.$axios.get(`/events/${eventId}/games`);

      this.mutations.setEvent(event.data);
      this.mutations.setEventMembers(eventMembers.data);
      this.mutations.setEventGames(eventGames.data);
    } catch (e) {
      console.error(e);
    }
  }
  async updateEvent({ eventId, title, description, date }) {
    try {
      const data = { title, description, date };
      const event = await this.store.$axios.patch(`/events/${eventId}`, data);

      this.mutations.setEvent(event.data);
    } catch (e) {
      console.error(e);
    }
  }
  async deleteEvent({ eventId }) {
    try {
      await this.store.$axios.delete(`/events/${eventId}`);

      this.mutations.setEvent({
        id: null,
        title: null,
        description: null,
        date: null
      });
    } catch (e) {
      console.error(e);
    }
  }
  async createGroupEvent({ groupId, title, description, date }) {
    try {
      const data = { title, description, date };
      const event = await this.store.$axios.post(`/groups/${groupId}/events`, data);

      this.mutations.setEvent(event.data);
    } catch (e) {
      console.error(e);
    }
  }
  async getGroupMembers({ groupId }) {
    try {
      const groupMembers = await this.store.$axios.get(`/groups/${groupId}/members`);

      this.mutations.setGroupMembers(groupMembers.data);
    } catch (e) {
      console.error(e);
    }
  }
  async addEventMembers({ eventId, userIds }) {
    try {
      const data = { userIds };
      await this.store.$axios.post(`/events/${eventId}/members`, data);
    } catch (e) {
      console.error(e);
    }
  }
  async addEventGame({ eventId, scores }: { eventId: any; scores: Score[] }) {
    try {
      const data = { scores };
      await this.store.$axios.post(`/events/${eventId}/games`, data);
    } catch (e) {
      console.error(e);
    }
  }
  async deleteEventGame({ eventId, gameId }) {
    try {
      await this.store.$axios.post(`/events/${eventId}/games/${gameId}`);
    } catch (e) {
      console.error(e);
    }
  }
}

export const eventModule = new Module({
  state: EventState,
  getters: EventGetters,
  mutations: EventMutations,
  actions: EventActions
});

export const eventMapper = createMapper(eventModule);
