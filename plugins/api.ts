import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
} from 'axios'
import Vue from 'vue'
import { Plugin } from '@nuxt/types'

export interface IAxiosInstance extends AxiosInstance {
  $request: <T = any, R = AxiosResponse<T>['data'], D = any>(
    config: AxiosRequestConfig<D>
  ) => Promise<R>
  $delete: <T = any, R = AxiosResponse<T>['data'], D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ) => Promise<R>
  $get: <T = any, R = AxiosResponse<T>['data'], D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ) => Promise<R>
  $head: <T = any, R = AxiosResponse<T>['data'], D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ) => Promise<R>
  $options: <T = any, R = AxiosResponse<T>['data'], D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ) => Promise<R>
  $post: <T = any, R = AxiosResponse<T>['data'], D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) => Promise<R>
  $put: <T = any, R = AxiosResponse<T>['data'], D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) => Promise<R>
  $patch: <T = any, R = AxiosResponse<T>['data'], D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) => Promise<R>
  isCancel: AxiosStatic['isCancel']
}

export const instance = axios.create({
  baseURL: 'https://api.realworld.io/api',
  headers: {
    'provider-code': 'deltaban',
    accept: 'application/json, text/plain, */*',
    withCredentials: 'true',
    'Content-Type': 'application/json',
  },
}) as IAxiosInstance

const axiosExtra = {}
for (const method of [
  'request',
  'delete',
  'get',
  'head',
  'options',
  'post',
  'put',
  'patch',
]) {
  axiosExtra['$' + method] = function (...args) {
    return this[method](...args).then((res) => res && res.data)
  }
}
for (const key in axiosExtra) {
  instance[key] = axiosExtra[key].bind(instance)
}

instance.isCancel = axios.isCancel.bind(instance)

declare module '@nuxt/types' {
  interface Context {
    $axios: IAxiosInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: IAxiosInstance
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $axios: IAxiosInstance
  }
}

const plugin: Plugin = function (ctx, inject) {
  const observableInstance = Vue.observable(instance)
  inject('axios', observableInstance)
  ctx.$axios = observableInstance
}

export default plugin
