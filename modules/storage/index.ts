import { Module } from '@nuxt/types';
import defu from 'defu';
const pre = (/^https?:\/\/(\w*)/.test(process.env.DOMAIN_URL || '') ? RegExp.$1 : '') + '_';

const defaults = {
  cookie: {
    prefix: pre,
    options: {}
  },
  localStorage: {
    prefix: pre
  }
  // ignoreExceptions: false
};

const module: Module = function (moduleOptions) {
  const { nuxt } = this;
  const options = defu(moduleOptions, { ...nuxt.options.storage }, defaults);
  this.addPlugin({
    src: require.resolve('./runtime/plugin'),
    fileName: 'storage.ts',
    options
  });
  nuxt.options.alias['./storage'] = require.resolve('./runtime/storage');
}
export default module
