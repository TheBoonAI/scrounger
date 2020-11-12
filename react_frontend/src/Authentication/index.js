import PropTypes from 'prop-types'
import useSWR from 'swr'

import Login from '../Login'

const Authentication = ({ children }) => {
  const { data } = useSWR(`/api/v1/me`)

  if (!data) return null

  const { username } = data || {}

  if (!username) {
    return <Login />
  }

  return children
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Authentication
