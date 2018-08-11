import Vue from 'vue';
import { Store, ActionTree } from 'vuex';
import { Route } from 'vue-router';

type Redirect = (status: Number, path: string, query?: any) => void;
type RedirectWithStatus = (status: Number, path: string, query?: any) => void;

export interface ApplicationContext {
  app: Vue;
  isClient: boolean;
  isServer: boolean;
  isStatic: boolean;
  isDev: Boolean;
  isHMR: Boolean;
  route: Route;
  store: Store<any>;
  env: object;
  params: Record<string, any>;
  query: object;
  req: any;
  res: any;
  redirect: Redirect | RedirectWithStatus;
  error: Function;
  nuxtState: any;
  beforeNuxtRender: Function;
  cookie?: {
    accessToken?: string
  };
}

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit?: (context, nuxtContext: ApplicationContext) => void;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<
    V extends Vue
   > {
    layout?: string | ((context: ApplicationContext) => string);
    fetch?: (context: ApplicationContext) => void;
    asyncData?: (context: ApplicationContext) => void;
    head?: Record<string, any> | ((this: V) => Record<string, any>);
    scrollToTop?: boolean;
    validate?: (context: ApplicationContext) => boolean;
    middleware?: string | string[];
  }
}
