import { Store } from 'vuex';
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { RootState } from './root';

export class UserState {
  id: string = '';
  name: string = '';
}

class UserGetters extends Getters<UserState> {
  get id(): string {
    return this.state.id;
  }
  get name(): string {
    return this.state.name;
  }
}

class UserMutations extends Mutations<UserState> {
  setUser({ id, name }) {
    this.state.id = id;
    this.state.name = name;
  }
}

class UserActions extends Actions<UserState, UserGetters, UserMutations> {
  store: Store<RootState> | null = null;
  $init(store: Store<RootState>): void {
    this.store = store;
  }
  async createUser({ name }) {
    try {
      const { data } = await this.store.$axios.post('/users', { name });

      this.mutations.setUser(data);
    } catch (e) {
      console.error(e);
    }
  }
  async getUser({ userId }) {
    try {
      const { data } = await this.store.$axios.get(`/users/${userId}`);

      this.mutations.setUser(data);
    } catch (e) {
      console.error(e);
    }
  }
  async updateUser({ userId, name }) {
    try {
      const { data } = await this.store.$axios.patch(`/users/${userId}`, { name });

      this.mutations.setUser(data);
    } catch (e) {
      console.error(e);
    }
  }
}

export const userModule = new Module({
  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions
});

export const userMapper = createMapper(userModule);
