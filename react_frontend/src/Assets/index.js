import PropTypes from 'prop-types'

import SuspenseBoundary from '../SuspenseBoundary'
import Uploader from '../Uploader'
import SimilaritySearch from '../SimilaritySearch'

import AssetsContent from './Content'

const Assets = ({ uploadedAssets, setUploadedAssets }) => {
  return (
    <Uploader
      uploadedAssets={uploadedAssets}
      setUploadedAssets={setUploadedAssets}
    >
      <SimilaritySearch
        uploadedAssets={uploadedAssets}
        setUploadedAssets={setUploadedAssets}
      />

      <SuspenseBoundary>
        <AssetsContent uploadedAssets={uploadedAssets} />
      </SuspenseBoundary>
    </Uploader>
  )
}

Assets.propTypes = {
  uploadedAssets: PropTypes.object.isRequired,
  setUploadedAssets: PropTypes.func.isRequired,
}

export default Assets
