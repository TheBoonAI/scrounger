/**
 * login()
 */
let mockLogin = () => {}

export const __setMockLogin = (fn) => {
  mockLogin = fn
}

export const login = (...args) => {
  mockLogin(...args)
}
