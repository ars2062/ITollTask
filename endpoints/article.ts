import { cleanParams } from '@/utils/params'

export const GET_ARTICLES = (
  options: Partial<
    Record<'tag' | 'author' | 'favorited' | 'limit' | 'offset', any>
  >
) => `/articles?${cleanParams(options)}`
