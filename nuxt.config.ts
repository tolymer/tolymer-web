import { NuxtConfig } from '@nuxt/types';

const nuxtConfig: NuxtConfig = {
  mode: 'spa',
  head: {
    title: 'Tolymer',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Pacifico|Roboto:400,700|Varela+Round'
      }
    ]
  },
  loading: false,
  srcDir: 'src',
  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:7700'
  },
  css: ['~/assets/css/lib.css', '~/assets/css/app.css'],
  serverMiddleware: [{ path: '/api', handler: '~/server/index.js' }],
  plugins: [
    '~/plugins/axios'
  ],
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ]
};

export default nuxtConfig;
