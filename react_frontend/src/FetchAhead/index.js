import PropTypes from 'prop-types'
import useSWR from 'swr'

const FetchAhead = ({ url }) => {
  useSWR(url, {
    suspense: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })

  return null
}

FetchAhead.propTypes = {
  url: PropTypes.string.isRequired,
}

export default FetchAhead
