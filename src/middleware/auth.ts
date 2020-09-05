import { Middleware, Context } from '@nuxt/types';
import { authModule } from '~/store/modules/auth';

const auth: Middleware = async function ({ store, redirect }: Context) {
  const authState = authModule.context(store);
  const accessToken = store.$cookies.get('accessToken');

  if (accessToken) {
    if (!store.state.id) {
      await authState.actions.login();
      await authState.actions.getCurrentUser({
        accessToken
      });

      redirect(301, authState.getters.location);
    }
  } else {
    await authState.actions.login();
  }
};

export default auth;
