export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ITollTask',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/styles/_reset.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/dayjs.ts', '@/plugins/api.ts', '@/plugins/auth.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    'nuxt-purgecss',
    [
      '@nuxtjs/vuetify',
      {
        treeShake: {
          components: ['VDialog', 'VTextField', 'VInput'],
        },
      },
    ],
  ],

  styleResources: {
    scss: ['./assets/styles/_global.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@/modules/storage/index.ts'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
}
