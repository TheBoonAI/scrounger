import { login } from '../helpers'

describe('<Authentication /> helpers', () => {
  describe('login', () => {
    test('properly handles response with 401 status', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 401 })

      const mockPreventDefault = jest.fn()
      const mockDispatch = jest.fn()
      const event = { preventDefault: mockPreventDefault }

      const callback = login({
        username: 'mockUsername',
        password: 'mockPassword',
        dispatch: mockDispatch,
      })

      await callback(event)

      expect(mockDispatch).toHaveBeenCalledWith({
        error: 'Invalid email or password.',
      })
    })

    test('properly handles error responses', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 500 })

      const mockPreventDefault = jest.fn()
      const mockDispatch = jest.fn()
      const event = { preventDefault: mockPreventDefault }

      const callback = login({
        username: 'mockUsername',
        password: 'mockPassword',
        dispatch: mockDispatch,
      })

      await callback(event)

      expect(mockDispatch).toHaveBeenCalledWith({
        error: 'Something went wrong.',
      })
    })
  })
})
