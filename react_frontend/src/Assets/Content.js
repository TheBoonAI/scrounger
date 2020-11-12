import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { getQueryString } from '../Query/helpers'

import FetchAhead from '../FetchAhead'
import Asset from '../Asset'

export const ASSETS_PER_PAGE = 24

const Assets = () => {
  const [assetIndex, setAssetIndex] = useState(-1)

  const {
    query: { q, p = 1, t },
  } = useRouter()

  const { data } = useSWR(
    `/assets${getQueryString({
      from: (+p - 1) * ASSETS_PER_PAGE,
      size: ASSETS_PER_PAGE,
      text_search: q,
      media_type: t,
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

      <div className="w-screen max-w-screen-xl h-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 p-1">
          {assets.map(({ id, name, type }, index) => {
            return (
              <div
                key={id}
                className="border-4 border-transparent hover:border-white"
              >
                <button
                  type="button"
                  className="min-w-full relative bg-gray-900 flex justify-center items-center"
                  style={{ paddingBottom: '100%' }}
                  onClick={() => setAssetIndex(index)}
                >
                  <img
                    className="absolute top-0 h-full object-contain"
                    src={`/api/v1/assets/${id}/thumbnail_file/`}
                    alt={name}
                  />

                  {['image', 'document'].includes(type) && (
                    <link
                      rel="preload"
                      as="image"
                      href={`/api/v1/assets/${id}/highres_file/`}
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
              </div>
            )
          })}
        </div>
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
