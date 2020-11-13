import Router, { useRouter } from 'next/router'

import { getQueryString } from '../Query/helpers'

const SimilaritySearch = () => {
  const {
    pathname,
    query,
    query: { s },
  } = useRouter()

  if (!s) return null

  const similarityQuery = s.split(',')

  return (
    <div className="px-2">
      <h3 className="pt-4 text-sm text-gray-400">
        Showing results similar to:
      </h3>
      <div className="flex py-2 border-b-2 border-gray-700">
        {similarityQuery.map((assetId) => {
          const newSimilarityQuery = similarityQuery
            .filter((id) => id !== assetId)
            .join(',')

          return (
            <div key={`similarity-${assetId}`} className="relative pr-2 group">
              <img
                className="h-20 sm:h-32 object-contain"
                src={`/api/v1/assets/${assetId}/thumbnail_file`}
                alt={`Similarity search item: ${assetId}`}
              />

              <button
                type="button"
                title="Remove from similarity search"
                aria-label="Remove from similarity search"
                className="absolute top-0 right-0 p-1 mt-1 mr-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100 rounded-full bg-gray-800 bg-opacity-75 hover:text-green-500 hover:bg-opacity-100"
                onClick={() => {
                  Router.push(
                    `${pathname}${getQueryString({
                      ...query,
                      p: '',
                      s: newSimilarityQuery,
                    })}`,
                  )
                }}
              >
                <svg viewBox="0 0 20 20" className="h-6 fill-current">
                  <path d="M13.9 4l1.4 1.4-4.2 4.2 4.2 4.2-1.4 1.4L9.7 11l-4.2 4.2L4 13.9l4.2-4.2L4 5.4 5.4 4l4.2 4.2L13.9 4z" />
                </svg>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SimilaritySearch
