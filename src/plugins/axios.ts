import { Plugin, Context } from '@nuxt/types';

const axios: Plugin = ({ $axios }: Context) => {
  $axios.defaults.baseURL = process.env.baseUrl;

  //if (authStore.getters.token !== null) {
  //  $axios.setToken(authStore.getters.token, 'Bearer');
  //}

  $axios.onResponse(response => {
    console.log('$axios.onResponse', response);
  });

  $axios.onError(error => {
    console.error('$axios.onError', error);
  });
};

export default axios;
