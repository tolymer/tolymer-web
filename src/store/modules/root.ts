import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { authModule } from './auth';
import { userModule } from './user';
import { groupModule } from './group';
import { eventModule } from './event';

export class RootState {}

class RootGetters extends Getters<RootState> {}

class RootMutations extends Mutations<RootState> {}

class RootActions extends Actions<RootState, RootGetters, RootMutations, RootMutations> {}

export const rootModule = new Module({
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
  modules: {
    auth: authModule,
    user: userModule,
    group: groupModule,
    event: eventModule
  }
});

export const rootMapper = createMapper(rootModule);
