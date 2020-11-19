import { fireEvent, render, screen } from '@testing-library/react'

import Login from '..'

jest.mock('../../Authentication/helpers')

describe('<Login />', () => {
  test('allows the user to log in', () => {
    const mockLogin = jest.fn()

    require('../../Authentication/helpers').__setMockLogin(mockLogin)

    render(<Login />)

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'mockUsername' },
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'mockPassword' },
    })

    fireEvent.click(screen.getByText('Sign In'))

    expect(mockLogin.mock.calls[0][0].username).toEqual('mockUsername')
    expect(mockLogin.mock.calls[0][0].password).toEqual('mockPassword')
  })
})
