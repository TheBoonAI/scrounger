import { useReducer } from 'react'

import Button from '../Button'
import Input from '../Input'

import { login } from '../Authentication/helpers'

const INITIAL_STATE = {
  username: '',
  password: '',
  error: '',
}

const reducer = (state, action) => ({ ...state, ...action })

const Login = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const { username, password, error } = state

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-gray-700 shadow-md rounded p-8">
        <form
          className="flex flex-col items-center"
          method="post"
          onSubmit={(event) => event.preventDefault()}
        >
          {!!error && (
            <div className="pt-1 pb-2 text-red-600 font-normal italic">
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Username"
            type="text"
            value={username}
            onChange={({ target: { value } }) => dispatch({ username: value })}
          />

          <div className="h-4" />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={({ target: { value } }) => dispatch({ password: value })}
          />

          <div className="h-12" />

          <Button
            variant="primary"
            type="submit"
            onClick={login({ username, password, dispatch })}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
