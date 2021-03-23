import { useState } from 'react'
import PropTypes from 'prop-types'

import { uploadAsset } from './helpers'

const Uploader = ({ uploadedAssets, setUploadedAssets, children }) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div
      className="w-screen max-w-screen-xl h-full"
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDrop={(event) => {
        event.preventDefault()
        uploadAsset({ uploadedAssets, setUploadedAssets })(event)
        setIsDragging(false)
      }}
    >
      {isDragging ? (
        <div
          className="m-4 p-4 flex-1 flex justify-center items-center border-4 border-green-500 border-dashed"
          style={{ height: '90%' }}
        >
          Drop an image here to search for similar documents
        </div>
      ) : (
        children
      )}
    </div>
  )
}

Uploader.propTypes = {
  uploadedAssets: PropTypes.object.isRequired,
  setUploadedAssets: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Uploader
