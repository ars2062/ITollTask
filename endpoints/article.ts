import { cleanParams } from '@/utils/params'

export const GET_ARTICLES = (
  options: Partial<
    Record<'tag' | 'author' | 'favorited' | 'limit' | 'offset', any>
  >
) => `/articles?${cleanParams(options)}`
export const CREATE_ARTICLE = () => '/articles'
export const GET_ARTICLE = (slug: string) => `/articles/${slug}`
export const GET_COMMENTS = (slug: string) => `/articles/${slug}/comments`
export const GET_TAGS = () => '/tags'
