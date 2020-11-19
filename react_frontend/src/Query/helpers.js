export const getQueryString = (params = {}) => {
  const queryString = Object.entries(params)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return queryString ? `?${queryString}` : ''
}
