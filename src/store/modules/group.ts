import { Store } from 'vuex';
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { RootState } from './root';

export class GroupState {
  id: string = '';
  name: string = '';
  description: string = '';
  members: any[] = [];
  events: any[] = [];
  stats: any[] = [];
}

class GroupGetters extends Getters<GroupState> {
  get id(): string {
    return this.state.id;
  }
  get name(): string {
    return this.state.name;
  }
  get description(): string {
    return this.state.description;
  }
  get members(): any[] {
    return this.state.members;
  }
  get events(): any[] {
    return this.state.events;
  }
  get stats(): any[] {
    return this.state.stats;
  }
}

class GroupMutations extends Mutations<GroupState> {
  setGroup({ id, name, description }) {
    this.state.id = id;
    this.state.name = name;
    this.state.description = description;
  }
  setGroupMembers(payload) {
    this.state.members = payload;
  }
  setGroupEvents(payload) {
    this.state.events = payload;
  }
  getGroupStats(payload) {
    this.state.stats = payload;
  }
}

class GroupActions extends Actions<GroupState, GroupGetters, GroupMutations> {
  store: Store<RootState> | null = null;
  $init(store: Store<RootState>): void {
    this.store = store;
  }
  async createGroup({ name, description }) {
    try {
      const data = { name, description };
      const group = await this.store.$axios.post(`/groups`, data, {});

      this.mutations.setGroup(group.data);
    } catch (e) {
      console.error(e);
    }
  }
  async getGroup({ groupId }) {
    try {
      const group = await this.store.$axios.get(`/groups/${groupId}`);
      const groupMembers = await this.store.$axios.get(`/groups/${groupId}/members`);
      const groupEvents = await this.store.$axios.get(`/groups/${groupId}/events`);

      this.mutations.setGroup(group.data);
      this.mutations.setGroupMembers(groupMembers.data);
      this.mutations.setGroupEvents(groupEvents.data);
    } catch (e) {
      console.error(e);
    }
  }
  async updateGroup({ groupId, name, description }) {
    try {
      const data = { name, description };
      const group = await this.store.$axios.patch(`/groups/${groupId}`, data);

      this.mutations.setGroup(group.data);
    } catch (e) {
      console.error(e);
    }
  }
  async deleteGroup({ groupId }) {
    try {
      await this.store.$axios.delete(`/groups/${groupId}`);

      this.mutations.setGroup({ id: null, name: null, description: null });
      this.mutations.setGroupMembers(null);
      this.mutations.setGroupEvents(null);
    } catch (e) {
      console.error(e);
    }
  }
  async addGroupMember({ groupId }) {
    try {
      await this.store.$axios.post(`/groups/${groupId}/members`, {});
    } catch (e) {
      console.error(e);
    }
  }
  async getGroupStats({ groupId }) {
    try {
      const groupStats = await this.store.$axios.get(`/groups/${groupId}/stats`);

      this.mutations.getGroupStats(groupStats.data);
    } catch (e) {
      console.error(e);
    }
  }
}

export const groupModule = new Module({
  state: GroupState,
  getters: GroupGetters,
  mutations: GroupMutations,
  actions: GroupActions
});

export const eventMapper = createMapper(groupModule);
