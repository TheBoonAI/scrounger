import Router, { useRouter } from 'next/router'

import { getQueryString } from '../Query/helpers'

const SimilaritySearch = () => {
  const {
    pathname,
    query,
    query: { s = '[]' },
  } = useRouter()

  const similarityQuery = JSON.parse(s)

  if (!similarityQuery.length) return null

  return (
    <>
      <h3 className="px-2 pt-4 text-sm text-gray-400">
        Showing results similar to:
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 px-1 py-2 border-b-2 border-gray-700">
        {similarityQuery.map((assetId) => {
          const newSimilarityQuery = similarityQuery.filter(
            (id) => id !== assetId,
          )

          return (
            <div key={`similarity-${assetId}`} className="p-1">
              <div
                className="relative bg-gray-900 flex justify-center items-center"
                style={{ paddingBottom: '50%' }}
              >
                <img
                  className="absolute top-0 left-0 h-full w-full object-contain"
                  src={`/api/v1/assets/${assetId}/thumbnail_file`}
                  alt={`Similarity search item: ${assetId}`}
                />

                <button
                  type="button"
                  title="Remove asset from similarity search"
                  aria-label="Remove asset from similarity search"
                  className="absolute top-0 right-0 p-1 m-1 rounded-full text-gray-600  bg-gray-800 bg-opacity-0 hover:text-gray-200 hover:bg-opacity-100"
                  onClick={() => {
                    Router.push(
                      `${pathname}${getQueryString({
                        ...query,
                        p: '',
                        s:
                          newSimilarityQuery.length &&
                          JSON.stringify(newSimilarityQuery),
                      })}`,
                    )
                  }}
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-6 sm:h-7 transform fill-current"
                  >
                    <path d="M13.9 4l1.4 1.4-4.2 4.2 4.2 4.2-1.4 1.4L9.7 11l-4.2 4.2L4 13.9l4.2-4.2L4 5.4 5.4 4l4.2 4.2L13.9 4z" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SimilaritySearch
