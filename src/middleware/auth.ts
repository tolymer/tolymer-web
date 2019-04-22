import { Context } from '@nuxt/vue-app/types'

export default async (context: Context) => {
  const accessToken = context.app.$cookies.get('accessToken');

  if (accessToken) {
    if (!context.store.state.id) {
      await context.store.dispatch('loggedIn');
      await context.store.dispatch('getCurrentUser', {
        accessToken
      });
    }
  } else {
    await context.store.dispatch('logout');

    context.redirect('/');
  }
};
