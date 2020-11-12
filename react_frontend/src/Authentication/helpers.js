import { cache, mutate } from 'swr'

const getCsrfToken = () => {
  if (typeof document === 'undefined') return ''

  const { csrftoken } = Object.fromEntries(
    document.cookie.split(/; */).map((c) => {
      const [key, ...v] = c.split('=')
      return [key, decodeURIComponent(v.join('='))]
    }),
  )

  return csrftoken
}

export const login = ({ username, password, dispatch }) => async (event) => {
  event.preventDefault()

  cache.clear()

  dispatch({ error: '' })

  const response = await fetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ username, password }),
  })

  if (response.status === 401) {
    return dispatch({ error: 'Invalid email or password.' })
  }

  if (response.status !== 200) {
    return dispatch({ error: 'Network error.' })
  }

  const user = await response.json()

  return mutate('/api/v1/me', user, false)
}

export const logout = async () => {
  const csrftoken = getCsrfToken()

  await fetch('/api/v1/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
  })

  mutate('/api/v1/me/', {}, false)

  cache.clear()

  localStorage.clear()
}
