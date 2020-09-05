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

export type EventBasicData = Pick<EventState, 'id' | 'title' | 'description' | 'date'>;

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
  setEvent({ id, title, description, date }: Partial<EventState>): void {
    this.state.id = id;
    this.state.title = title;
    this.state.description = description;
    this.state.date = date;
  }
  setEventMembers(payload: any[]): void {
    this.state.members = payload;
  }
  setEventGames(payload: any[]): void {
    this.state.games = payload;
  }
  setGroupMembers(payload: any[]): void {
    this.state.groupMembers = payload;
  }
}

class EventActions extends Actions<EventState, EventGetters, EventMutations> {
  store: Store<RootState> | null = null;
  $init(store: Store<RootState>): void {
    this.store = store;
  }
  async createEvent({ title, description, date }: Partial<EventBasicData>): Promise<void> {
    const event = await this.store.$axios.post<EventBasicData>(`/events`, { title, description, date });

    this.mutations.setEvent(event.data);
  }
  async getEvent(eventId: string): Promise<void> {
    const event = await this.store.$axios.get<EventBasicData>(`/events/${eventId}`);
    const eventMembers = await this.store.$axios.get<any[]>(`/events/${eventId}/members`);
    const eventGames = await this.store.$axios.get<any[]>(`/events/${eventId}/games`);

    this.mutations.setEvent(event.data);
    this.mutations.setEventMembers(eventMembers.data);
    this.mutations.setEventGames(eventGames.data);
  }
  async updateEvent({ id, title, description, date }: EventBasicData): Promise<void> {
    const event = await this.store.$axios.patch<EventBasicData>(`/events/${id}`, { title, description, date });

    this.mutations.setEvent(event.data);
  }
  async deleteEvent(eventId: string): Promise<void> {
    await this.store.$axios.delete(`/events/${eventId}`);

    this.mutations.setEvent({
      id: null,
      title: null,
      description: null,
      date: null
    });
  }
  async createGroupEvent({ groupId, title, description, date }: Partial<EventBasicData> & { groupId: string }): Promise<void> {
    const event = await this.store.$axios.post<EventBasicData>(`/groups/${groupId}/events`, { title, description, date });

    this.mutations.setEvent(event.data);
  }
  async getGroupMembers(groupId: string): Promise<void> {
    const groupMembers = await this.store.$axios.get<any[]>(`/groups/${groupId}/members`);

    this.mutations.setGroupMembers(groupMembers.data);
  }
  async addEventMembers({ eventId, userIds }: { eventId: string, userIds: string[] }): Promise<void> {
    await this.store.$axios.post(`/events/${eventId}/members`, { userIds });
  }
  async addEventGame({ eventId, scores }: { eventId: string, scores: Score[] }): Promise<void> {
    await this.store.$axios.post(`/events/${eventId}/games`, { scores });
  }
  async deleteEventGame(eventId: string, gameId: string): Promise<void> {
    await this.store.$axios.post(`/events/${eventId}/games/${gameId}`);
  }
}

export const eventModule = new Module({
  state: EventState,
  getters: EventGetters,
  mutations: EventMutations,
  actions: EventActions
});

export const eventMapper = createMapper(eventModule);
