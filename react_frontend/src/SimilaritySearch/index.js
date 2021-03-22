import PropTypes from 'prop-types'
import Router, { useRouter } from 'next/router'

import { getQueryString } from '../Query/helpers'
import SimilaritySearchThumbnail from './Thumbnail'

const SimilaritySearch = ({ uploadedAssets, setUploadedAssets }) => {
  const {
    pathname,
    query,
    query: { s = '' },
  } = useRouter()

  if (!s && Object.keys(uploadedAssets).length === 0) return null

  const assetIds = s.split(',').filter(Boolean)

  return (
    <div className="px-2">
      <h3 className="pt-4 text-sm text-gray-400">
        Showing results similar to:
      </h3>
      <div className="flex py-2 border-b-2 border-gray-700">
        {Object.entries(uploadedAssets).map(([fileName, dataURL]) => {
          return (
            <SimilaritySearchThumbnail
              key={fileName}
              assetId={`uploaded asset ${fileName}`}
              src={dataURL}
              onClick={() => {
                const { [fileName]: extract, ...rest } = uploadedAssets

                setUploadedAssets(rest)

                Router.push(
                  `${pathname}${getQueryString({
                    ...query,
                    p: '',
                  })}`,
                )
              }}
            />
          )
        })}
        {assetIds.map((assetId) => {
          const similarityQuery = assetIds
            .filter((id) => id !== assetId)
            .join(',')

          return (
            <SimilaritySearchThumbnail
              key={`similarity-${assetId}`}
              assetId={assetId}
              src={`/api/v1/assets/${assetId}/thumbnail_file`}
              onClick={() => {
                Router.push(
                  `${pathname}${getQueryString({
                    ...query,
                    p: '',
                    s: similarityQuery,
                  })}`,
                )
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

SimilaritySearch.propTypes = {
  uploadedAssets: PropTypes.object.isRequired,
  setUploadedAssets: PropTypes.func.isRequired,
}

export default SimilaritySearch
