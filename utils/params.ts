export const cleanParams = (params: Record<string, string>): string => {
  return Object.entries(params)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}
