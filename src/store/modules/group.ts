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

export type GroupBasicData = Pick<GroupState, 'id' | 'name' | 'description'>;

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
  setGroup({ id, name, description }: GroupBasicData) {
    this.state.id = id;
    this.state.name = name;
    this.state.description = description;
  }
  setGroupMembers(payload: any[]) {
    this.state.members = payload;
  }
  setGroupEvents(payload: any[]) {
    this.state.events = payload;
  }
  getGroupStats(payload: any[]) {
    this.state.stats = payload;
  }
}

class GroupActions extends Actions<GroupState, GroupGetters, GroupMutations> {
  store: Store<RootState> | null = null;
  $init(store: Store<RootState>): void {
    this.store = store;
  }
  async createGroup({ name, description }: Partial<GroupBasicData>): Promise<void> {
    const group = await this.store.$axios.post<GroupBasicData>(`/groups`, { name, description });

    this.mutations.setGroup(group.data);
  }
  async getGroup(groupId: string): Promise<void> {
    const group = await this.store.$axios.get<GroupBasicData>(`/groups/${groupId}`);
    const groupMembers = await this.store.$axios.get<any[]>(`/groups/${groupId}/members`);
    const groupEvents = await this.store.$axios.get<any[]>(`/groups/${groupId}/events`);

    this.mutations.setGroup(group.data);
    this.mutations.setGroupMembers(groupMembers.data);
    this.mutations.setGroupEvents(groupEvents.data);
  }
  async updateGroup({ id, name, description }: GroupBasicData): Promise<void> {
    const group = await this.store.$axios.patch<GroupBasicData>(`/groups/${id}`, { name, description });

    this.mutations.setGroup(group.data);
  }
  async deleteGroup(groupId: string): Promise<void> {
    await this.store.$axios.delete(`/groups/${groupId}`);

    this.mutations.setGroup({ id: null, name: null, description: null });
    this.mutations.setGroupMembers(null);
    this.mutations.setGroupEvents(null);
  }
  async addGroupMember(groupId: string): Promise<void> {
    await this.store.$axios.post(`/groups/${groupId}/members`, {});
  }
  async getGroupStats(groupId: string): Promise<void> {
    const groupStats = await this.store.$axios.get(`/groups/${groupId}/stats`);

    this.mutations.getGroupStats(groupStats.data);
  }
}

export const groupModule = new Module({
  state: GroupState,
  getters: GroupGetters,
  mutations: GroupMutations,
  actions: GroupActions
});

export const eventMapper = createMapper(groupModule);
