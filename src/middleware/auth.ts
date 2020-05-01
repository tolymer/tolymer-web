import { Middleware, Context } from '@nuxt/types';

const auth: Middleware = async function(context: Context) {
  const accessToken = context.store.$cookies.get('accessToken');

  if (accessToken) {
    if (!context.store.state.id) {
      await context.store.dispatch('loggedIn');
      await context.store.dispatch('getCurrentUser', {
        accessToken
      });
    }
  } else {
    await context.store.dispatch('logout');
  }
};

export default auth;
