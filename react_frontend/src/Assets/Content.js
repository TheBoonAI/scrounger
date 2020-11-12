import useSWR from 'swr'
import { useRouter } from 'next/router'

import { getQueryString } from '../Query/helpers'

import FetchAhead from '../FetchAhead'

export const ASSETS_PER_PAGE = 24

const Assets = () => {
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
      <div className="w-screen max-w-screen-xl h-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 p-1">
          {assets.map(({ id, name }) => {
            return (
              <div
                key={id}
                className="border-4 border-transparent hover:border-white"
              >
                <div
                  className="relative bg-gray-900 flex justify-center items-center"
                  style={{ paddingBottom: '100%' }}
                >
                  <img
                    className="absolute top-0 h-full w-full object-contain"
                    src={`/api/v1/assets/${id}/thumbnail_file`}
                    alt={name}
                  />
                </div>
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
