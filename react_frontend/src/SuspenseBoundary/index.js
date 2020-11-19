import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import PropTypes from 'prop-types'

import Loading from '../Loading'

import SuspenseBoundaryFallback from './Fallback'

const SuspenseBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={SuspenseBoundaryFallback}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

SuspenseBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SuspenseBoundary
