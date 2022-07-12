import { GetterTree, ActionTree, MutationTree } from 'vuex'

export type TArticlesState = {
  authDialog: boolean
  authDialogState: 'LOGIN' | 'REGISTER'
}
type TStateKeys = keyof TArticlesState

const initialState: TArticlesState = {
  authDialog: false,
  authDialogState: 'LOGIN',
}

export const state = () => initialState

export const getters: GetterTree<TArticlesState, TArticlesState> = {
  getAuthDialog: (state) => state.authDialog,
  getAuthDialogState: (state) => state.authDialogState,
}

export const mutations: MutationTree<TArticlesState> = {
  SET: (state, payload: Record<TStateKeys, any>) => {
    Object.entries(payload).forEach(([key, value]) => {
      state[key] = value
    })
  },
}

export const actions: ActionTree<TArticlesState, TArticlesState> = {}
