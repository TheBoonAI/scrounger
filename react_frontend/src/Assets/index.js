import PropTypes from 'prop-types'

import SuspenseBoundary from '../SuspenseBoundary'

import SimilaritySearch from '../SimilaritySearch'

import AssetsContent from './Content'

const Assets = ({ uploadedAssets, setUploadedAssets }) => {
  return (
    <div className="w-screen max-w-screen-xl h-full">
      <SimilaritySearch
        uploadedAssets={uploadedAssets}
        setUploadedAssets={setUploadedAssets}
      />

      <SuspenseBoundary>
        <AssetsContent
          uploadedAssets={uploadedAssets}
          setUploadedAssets={setUploadedAssets}
        />
      </SuspenseBoundary>
    </div>
  )
}

Assets.propTypes = {
  uploadedAssets: PropTypes.object.isRequired,
  setUploadedAssets: PropTypes.func.isRequired,
}

export default Assets
