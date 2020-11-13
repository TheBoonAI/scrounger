import PropTypes from 'prop-types'
import useSWR from 'swr'

/**
 * Makes an API call that gets stored in the SWR cache.
 * Most common use case is for pagination: skips loading screen or flickering components when navigating pages
 * because SWR accesses the cache instead of making a new call and waiting for the response
 */

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
