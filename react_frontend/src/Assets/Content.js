import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

import { getQueryString } from '../Query/helpers'

import FetchAhead from '../FetchAhead'
import Asset from '../Asset'

export const ASSETS_PER_PAGE = 24

const AdobePremiereImport = dynamic(
  () => import('../AdobePremiereImport/index'),
  { ssr: false },
)

const Assets = () => {
  const [assetIndex, setAssetIndex] = useState(-1)

  const {
    pathname,
    query,
    query: { q, p = 1, t, s = '' },
  } = useRouter()

  const { data } = useSWR(
    `/assets${getQueryString({
      from: (+p - 1) * ASSETS_PER_PAGE,
      size: ASSETS_PER_PAGE,
      text_search: q,
      media_type: t,
      similarity_search: s,
    })}`,
  )

  if (!data) return null

  const { assets, count } = data

  if (count === 0) {
    return (
      <div className="flex justify-center items-center h-full">No results</div>
    )
  }

  return (
    <>
      <Asset
        assets={assets}
        assetIndex={assetIndex}
        setAssetIndex={setAssetIndex}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 p-1">
        {assets.map(({ id, name, type }, index) => {
          const similarityQuery = s.split(',')
          const isSimilar = similarityQuery.find((simId) => simId === id)

          return (
            <div
              key={id}
              className="border-4 border-transparent hover:border-white relative group"
            >
              <button
                type="button"
                className="min-w-full relative bg-gray-900 flex justify-center items-center"
                style={{ paddingBottom: '100%' }}
                onClick={() => setAssetIndex(index)}
              >
                <img
                  className="absolute top-0 h-full object-contain"
                  src={`/api/v1/assets/${id}/thumbnail_file`}
                  alt={name}
                />

                {['image', 'document'].includes(type) && (
                  <link
                    rel="preload"
                    as="image"
                    href={`/api/v1/assets/${id}/highres_file`}
                  />
                )}

                {type === 'video' && (
                  <span className="absolute bottom-0 right-0 border-2 m-2 p-2 rounded-full">
                    <svg
                      className="fill-current h-2"
                      viewBox="0 0 20 20"
                      style={{ marginLeft: 1, marginRight: -1 }}
                    >
                      <path d="M20 10L0 20V0z" />
                    </svg>
                  </span>
                )}
              </button>

              <AdobePremiereImport id={id} name={name} />

              <button
                type="button"
                title={
                  isSimilar
                    ? 'Remove from similarity search'
                    : 'Find similar images'
                }
                aria-label={`Find similar images to ${name}`}
                className={`absolute top-0 right-0 p-2 m-2 rounded-full bg-gray-800 bg-opacity-75 hover:bg-opacity-100 ${
                  isSimilar
                    ? 'text-green-500'
                    : 'text-white hover:text-green-500 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100'
                }`}
                onClick={(event) => {
                  event.stopPropagation()

                  if (!isSimilar) {
                    Router.push(
                      `${pathname}${getQueryString({
                        ...query,
                        p: '',
                        s: s ? [similarityQuery, id].join(',') : id,
                      })}`,
                    )
                  }

                  if (isSimilar) {
                    const newSimilarityQuery = similarityQuery
                      .filter((simId) => simId !== id)
                      .join(',')

                    Router.push(
                      `${pathname}${getQueryString({
                        ...query,
                        p: '',
                        s: newSimilarityQuery,
                      })}`,
                    )
                  }
                }}
              >
                <svg className="fill-current h-5" viewBox="0 0 20 20">
                  <path d="M12 0a8 8 0 013.293 15.293A8 8 0 114.708 4.707 8 8 0 0112 0zM4.014 7.516l-.106.096a6 6 0 108.577 8.374 8 8 0 01-8.47-8.47zM8 6a6 6 0 00-1.743.257 6 6 0 007.486 7.486A6 6 0 008 6zm4-4a5.985 5.985 0 00-4.485 2.014 8 8 0 018.47 8.47A6 6 0 0012 2z" />
                </svg>
              </button>
            </div>
          )
        })}
      </div>

      {/* Fetch previous page if possible */}
      {p > 1 && (
        <FetchAhead
          url={`/assets${getQueryString({
            from: (+p - 2) * ASSETS_PER_PAGE,
            size: ASSETS_PER_PAGE,
            text_search: q,
            media_type: t,
          })}`}
        />
      )}

      {/* Fetch next page if possible */}
      {p < Math.ceil(count / ASSETS_PER_PAGE) && (
        <FetchAhead
          url={`/assets${getQueryString({
            from: +p * ASSETS_PER_PAGE,
            size: ASSETS_PER_PAGE,
            text_search: q,
            media_type: t,
          })}`}
        />
      )}
    </>
  )
}

export default Assets
