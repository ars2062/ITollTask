import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { IArticle } from '@/types/Article'
import { GET_ARTICLES } from '~/endpoints/article'

export type TArticlesState = {
  articles: IArticle[]
  articleCount: number
  loading: boolean
}
type TStateKeys = keyof TArticlesState

const initialState: TArticlesState = {
  articles: [],
  articleCount: 0,
  loading: false,
}

export const state = () => initialState

export const getters: GetterTree<TArticlesState, TArticlesState> = {
  getArticles: (state) => state.articles,
  getArticleCount: (state) => state.articleCount,
  getArticleLoading: (state) => state.loading,
}

export const mutations: MutationTree<TArticlesState> = {
  SET: (state, payload: Record<TStateKeys, any>) => {
    Object.entries(payload).forEach(([key, value]) => {
      state[key] = value
    })
  },
}

export const actions: ActionTree<TArticlesState, TArticlesState> = {
  fetchArticles({ commit }, { page = 1, count = 20 } = {}) {
    const offset = (page - 1) * count
    commit('SET', { loading: true })
    this.$axios
      .$get<{ articles: IArticle[]; articlesCount: number }>(
        GET_ARTICLES({ offset, limit: count })
      )
      .then((res) => {
        commit('SET', { ...res })
      })
      .finally(() => {
        commit('SET', { loading: false })
      })
  },
}
