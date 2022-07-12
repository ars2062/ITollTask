import Vue from 'vue'
import { Context, Plugin } from '@nuxt/types'
import { LOGIN_USER, UPDATE_USER, USER } from '@/endpoints/auth'
export type TUser = {
  email: string
  username: string
  bio?: any
  image?: any
  token: string
} | null
class Auth {
  $axios: Context['$axios']
  $storage: Context['$storage']
  _user: TUser
  constructor(ctx: Context) {
    this.$axios = ctx.$axios
    this.$storage = ctx.$storage
    this._user = this.$storage.getCookie('user')
  }

  set user(val: TUser) {
    this.$storage.setCookie('user', val)
    this._user = val
  }

  get user() {
    return this._user
  }

  login(email, password) {
    return this.$axios
      .$post<{ user: TUser }>(LOGIN_USER(), { user: { email, password } })
      .then((res) => {
        this.user = res.user
        return res
      })
      .catch((e) => {
        console.error(e)
        return Promise.reject(e)
      })
  }

  logout() {
    this.$storage.removeCookie('user')
    this.user = null
  }

  register(email, username, password) {
    return this.$axios
      .$post<{ user: TUser }>(USER(), { user: { email, username, password } })
      .then((res) => {
        this.user = res.user
        return res
      })
      .catch((e) => {
        console.error(e)
        return Promise.reject(e)
      })
  }

  getUser() {
    return this.$axios
      .$get(UPDATE_USER())
      .then((res) => {
        this.user = res.user
        return res
      })
      .catch((e) => {
        console.error(e)
        return Promise.reject(e)
      })
  }

  updateUser(user: TUser) {
    console.log(user)

    return this.$axios
      .put(UPDATE_USER(), { user })
      .then((res) => {
        return res
      })
      .catch((e) => {
        console.error(e)
        return Promise.reject(e)
      })
  }

  get loggedIn() {
    return !!this.user
  }
}

declare module '@nuxt/types' {
  interface Context {
    $auth: Auth
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $auth: Auth
  }
}

const plugin: Plugin = function (ctx, inject) {
  const auth = Vue.observable(new Auth(ctx))
  inject('auth', auth)
  ctx.$auth = auth
}

export default plugin
