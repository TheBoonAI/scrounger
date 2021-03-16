import PropTypes from 'prop-types'

import { uploadAsset } from './helpers'

const Uploader = ({ uploadedAssets, setUploadedAssets }) => {
  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={uploadAsset({ uploadedAssets, setUploadedAssets })}
    />
  )
}

Uploader.propTypes = {
  uploadedAssets: PropTypes.object.isRequired,
  setUploadedAssets: PropTypes.func.isRequired,
}

export default Uploader
