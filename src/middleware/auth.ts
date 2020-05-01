import { Middleware, Context } from '@nuxt/types';

const auth: Middleware = async function({ store }: Context) {
  const accessToken = store.$cookies.get('accessToken');

  if (accessToken) {
    if (!store.state.id) {
      await store.dispatch('loggedIn');
      await store.dispatch('getCurrentUser', {
        accessToken
      });
    }
  } else {
    await store.dispatch('logout');
  }
};

export default auth;
