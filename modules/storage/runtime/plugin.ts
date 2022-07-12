// eslint-disable
import { Storage } from './storage';
import { Plugin } from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $storage: Storage
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $storage: Storage
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $storage: Storage
  }
}

const plugin: Plugin = function (ctx, inject) {
  // @ts-ignore
  let options = <%= JSON.stringify(options, null, 2) %>

  const storage = new Storage(ctx, options);

  ctx.$storage = storage;
  inject('storage', storage);
}


export default plugin
