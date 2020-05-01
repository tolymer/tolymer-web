import { Store } from 'vuex';
import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { RootState } from './root';

export class AuthState {
  location: string = '';
  isLoggedIn: boolean = false;
  id: string = '';
  name: string = '';
  groups: string[] = [];
}

class AuthGetters extends Getters<AuthState> {
  get location(): string {
    return this.state.location;
  }
  get isLoggedIn(): boolean {
    return this.state.isLoggedIn;
  }
  get id(): string {
    return this.state.id;
  }
  get name(): string {
    return this.state.name;
  }
  get groups(): string[] {
    return this.state.groups;
  }
}

class AuthMutations extends Mutations<AuthState> {
  setLocation(location: string) {
    this.state.location = location;
  }
  setIsLoggedIn(isLoggedIn: boolean) {
    this.state.isLoggedIn = isLoggedIn;
  }
  setId(id: string) {
    this.state.id = id;
  }
  setName(name: string) {
    this.state.name = name;
  }
  setGroups(groups: string[]) {
    this.state.groups = groups;
  }
}

class AuthActions extends Actions<AuthState, AuthGetters, AuthMutations> {
  store: Store<RootState> | null = null;
  $init(store: Store<RootState>): void {
    this.store = store;
  }
  async login() {
    try {
      const authGoogle = await this.store.$axios.get('/auth/google');

      this.mutations.setLocation(authGoogle.data);
    } catch (e) {
      console.error(e);
    }
  }
  async loginCallback({ code, state }) {
    try {
      const params = { code, state };
      const config = { params };
      await this.store.$axios.get('/auth/google/callback', config);

      this.mutations.setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
    }
  }
  async logout() {
    this.mutations.setIsLoggedIn(false);
    this.mutations.setId('');
    this.mutations.setName('');
    this.mutations.setGroups([]);
  }
  async getCurrentUser() {
    try {
      const user = await this.store.$axios.get('/current_user');
      const userGroups = await this.store.$axios.get('/current_user/groups');

      this.mutations.setId(user.data.id);
      this.mutations.setName(user.data.name);
      this.mutations.setGroups(userGroups.data);
    } catch (e) {
      console.error(e);
    }
  }
}

export const authModule = new Module({
  state: AuthState,
  getters: AuthGetters,
  mutations: AuthMutations,
  actions: AuthActions
});

export const authMapper = createMapper(authModule);
