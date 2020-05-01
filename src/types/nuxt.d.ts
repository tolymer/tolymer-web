import { NuxtCookies } from 'cookie-universal-nuxt';

declare module 'vuex/types/index' {
  interface Store<S> {
    $cookies: NuxtCookies;
  }
}

declare module 'vue/types/vue' {
  export interface Vue {
    $cookies: NuxtCookies;
  }
}
