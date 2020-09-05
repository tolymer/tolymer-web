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

export type AuthBasicData = Pick<AuthState, 'id' | 'name'>;

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
  setLocation(location: string): void {
    this.state.location = location;
  }
  setIsLoggedIn(isLoggedIn: boolean): void {
    this.state.isLoggedIn = isLoggedIn;
  }
  setId(id: string): void {
    this.state.id = id;
  }
  setName(name: string): void {
    this.state.name = name;
  }
  setGroups(groups: string[]): void {
    this.state.groups = groups;
  }
}

class AuthActions extends Actions<AuthState, AuthGetters, AuthMutations> {
  store: Store<RootState> | null = null;
  $init(store: Store<RootState>): void {
    this.store = store;
  }
  async login(): Promise<void> {
    const authGoogle = await this.store.$axios.get('/auth/google');

    this.mutations.setLocation(authGoogle.data);
  }
  async loginCallback({ code, state }: { code: string, state: string }): Promise<void> {
    await this.store.$axios.get('/auth/google/callback', {
      params: { code, state }
    });

    this.mutations.setIsLoggedIn(true);
  }
  async logout(): Promise<void> {
    this.mutations.setIsLoggedIn(false);
    this.mutations.setId('');
    this.mutations.setName('');
    this.mutations.setGroups([]);
  }
  async getCurrentUser(): Promise<void> {
    const user = await this.store.$axios.get<AuthBasicData>('/current_user');
    const userGroups = await this.store.$axios.get<any[]>('/current_user/groups');

    this.mutations.setId(user.data.id);
    this.mutations.setName(user.data.name);
    this.mutations.setGroups(userGroups.data);
  }
}

export const authModule = new Module({
  state: AuthState,
  getters: AuthGetters,
  mutations: AuthMutations,
  actions: AuthActions
});

export const authMapper = createMapper(authModule);
