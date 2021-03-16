import { useState } from 'react'

import SuspenseBoundary from '../SuspenseBoundary'

import SimilaritySearch from '../SimilaritySearch'

import AssetsContent from './Content'

const Assets = () => {
  const [uploadedAssets, setUploadedAssets] = useState({})

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

export default Assets
