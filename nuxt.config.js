module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'tolymer-web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Tolymer Web' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: {
      allChunks: true
    },
    watch: [
      '~/api/*.js'
    ]
  },
  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:7700'
  },
  css: [
    '~assets/css/lib.css',
    '~assets/css/app.css'
  ],
  router: {
    middleware: ['cookie']
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server/index.js' }
  ]
}
