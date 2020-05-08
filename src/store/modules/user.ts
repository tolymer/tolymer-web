import { Store } from 'vuex';
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { RootState } from './root';

export class UserState {
  id: string = '';
  name: string = '';
}

export type UserData = Pick<UserState, 'id' | 'name'>;

class UserGetters extends Getters<UserState> {
  get id(): string {
    return this.state.id;
  }
  get name(): string {
    return this.state.name;
  }
}

class UserMutations extends Mutations<UserState> {
  setUser({ id, name }: UserData): void {
    this.state.id = id;
    this.state.name = name;
  }
}

class UserActions extends Actions<UserState, UserGetters, UserMutations> {
  store: Store<RootState> | null = null;
  $init(store: Store<RootState>): void {
    this.store = store;
  }
  async createUser({ name }: UserData): Promise<void> {
    const user = await this.store.$axios.post<UserData>('/users', { name });

    this.mutations.setUser(user.data);
  }
  async getUser(userId: string): Promise<void> {
    const user = await this.store.$axios.get<UserData>(`/users/${userId}`);

    this.mutations.setUser(user.data);
  }
  async updateUser({ id, name }: UserData): Promise<void> {
    const user = await this.store.$axios.patch<UserData>(`/users/${id}`, { name });

    this.mutations.setUser(user.data);
  }
}

export const userModule = new Module({
  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions
});

export const userMapper = createMapper(userModule);
