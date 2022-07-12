import { Plugin } from '@nuxt/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

declare module '@nuxt/types' {
  interface Context {
    $dayjs: typeof dayjs
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $dayjs: typeof dayjs
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $dayjs: typeof dayjs
  }
}

const plugin: Plugin = function (ctx, inject) {
  inject('dayjs', dayjs)
  ctx.$dayjs = dayjs
}

export default plugin
