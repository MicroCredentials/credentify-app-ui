export default {
  mode: 'spa',
  head: {
    title: 'Credentify',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'The first blockchain-based issuer of ECTS credentials.'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      }
    ]
  },
  pageTransition: {
    name: 'slide-fade',
    mode: 'out-in'
  },
  scrollToTop: true,
  loading: {
    color: '#3651FF'
  },
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      home: '/institutions'
    },
    resetOnError: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/profile/auth',
            method: 'post',
            propertyName: 'data.authToken'
          },
          logout: false,
          user: {
            url: '/profile',
            method: 'get',
            propertyName: 'data'
          }
        }
      }
    }
  },
  plugins: [
    { src: '~plugins/axios' },
    { src: '~plugins/vue-select', ssr: false },
    { src: '~plugins/vue-modal', ssr: false },
    { src: '~plugins/vue-paginate', ssr: false },
    { src: '~plugins/common-ui' },
    { src: '~plugins/vue-gravatar' },
    { src: '~plugins/vee-validate' },
    { src: '~plugins/vue-date' },
    { src: '~plugins/vue-js-modal' },
    { src: '~plugins/providers' },
    { src: '~plugins/vue-date' }
  ],
  styleResources: {
    scss: [
      './assets/styles/components/_variables.scss',
      './assets/styles/components/_mixins.scss'
    ]
  },
  css: [
    './assets/styles/components/_layout',
    './assets/styles/components/_animations',
    './assets/styles/components/_forms',
    './assets/styles/components/_modal',
    './assets/styles/components/_tables',
    './assets/styles/components/_tags',
    './assets/styles/typography',
    './assets/styles/global',
    './assets/styles/vendor/grid'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'bottom-right',
    duration: 3000
  },
  axios: {
    headers: { 'content-type': 'application/json' },
    // baseURL: process.env.API_BASE_URL || 'http://localhost:4444'
    baseURL: process.env.API_BASE_URL || 'https://api-staging.credentify.eu/'
  },
  env: {
    bitskiRedirect:
      process.env.BITSKI_REDIRECT || 'http://localhost:3000/callback.html',
    signingMessage:
      process.env.SIGNING_MESSAGE || 'I accept Credentify Terms of Use.',
    etherscanUrl: process.env.ETHERSCAN_URL || 'https://rinkeby.etherscan.io',
    ledgerId:
      process.env.LEDGER_ID || '0x6D984eD0a0675199C5146220BBeE274b52EC0b13'
  },
  stylelint: {
    quiet: true,
    fix: true
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-115025060-2'
      }
    ]
  ],
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
