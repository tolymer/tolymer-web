export default async context => {
  const { accessToken } = context.cookie;

  if (accessToken) {
    await context.store.dispatch("loggedIn");

    await context.store.dispatch("getCurrentUser", {
      accessToken
    });
  } else {
    await context.store.dispatch("logout");

    context.redirect("/");
  }
};
