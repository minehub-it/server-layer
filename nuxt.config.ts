import {createResolver} from '@nuxt/kit'

const {resolve} = createResolver(import.meta.url)

export default defineNuxtConfig({
  srcDir: './src',

  alias: {
    's': resolve(__dirname, './src'),
  },
  modules: [
    '@nuxt/content',
  ],
  content: {
    documentDriven: false,
    sources: {
      github: {
        prefix: '/server',
        driver: 'github',
        repo: "minehub-it/server-list",
        branch: "main",
        dir: "/",
      },
    }
  },
  imports: {
    dirs: ['api', 'const', 'composables', 'stores', 'utils']
  },
})
