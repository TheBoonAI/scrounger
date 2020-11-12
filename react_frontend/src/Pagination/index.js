import Router, { useRouter } from 'next/router'
import useSWR from 'swr'

import { getQueryString } from '../Query/helpers'
import { ASSETS_PER_PAGE } from '../Assets/Content'

const Pagination = () => {
  const {
    pathname,
    query,
    query: { p = 1, t, q },
  } = useRouter()

  const { data } = useSWR(
    `/assets${getQueryString({
      from: +p * ASSETS_PER_PAGE - ASSETS_PER_PAGE,
      size: ASSETS_PER_PAGE,
      text_search: q,
      media_type: t,
    })}`,
    { suspense: false },
  )

  const { count = 0 } = data || {}

  const maxPages = Math.ceil(count / ASSETS_PER_PAGE)

  return (
    <div className="flex items-center">
      {count > 0 && (
        <>
          <p className="hidden sm:block">
            {p} of {maxPages}
          </p>
          <div className="w-3" />
        </>
      )}

      <button
        type="button"
        aria-label="Go to previous page"
        title="Go to previous page"
        disabled={count === 0 || p <= 1}
        onClick={() => {
          const page = +p > 2 ? { p: +p - 1 } : { p: '' }
          Router.push(`${pathname}${getQueryString({ ...query, ...page })}`)
        }}
        className={`border-2 rounded-full mr-1 ${
          count === 0 || p <= 1
            ? 'text-gray-700 border-gray-700 cursor-not-allowed'
            : 'hover:text-green-500 hover:border-green-500'
        }`}
      >
        <svg
          viewBox="0 0 20 20"
          className="h-8 w-8 transform rotate-90 fill-current"
        >
          <path d="M14.243 7.586L10 11.828 5.757 7.586 4.343 9 10 14.657 15.657 9l-1.414-1.414z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Go to next page"
        title="Go to next page"
        disabled={count === 0 || p >= maxPages}
        onClick={() =>
          Router.push(`${pathname}${getQueryString({ ...query, p: +p + 1 })}`)
        }
        className={`border-2 rounded-full ${
          count === 0 || p >= maxPages
            ? 'text-gray-700 border-gray-700 cursor-not-allowed'
            : 'hover:text-green-500 hover:border-green-500'
        }`}
      >
        <svg
          viewBox="0 0 20 20"
          className="h-8 w-8 transform -rotate-90 fill-current"
        >
          <path d="M14.243 7.586L10 11.828 5.757 7.586 4.343 9 10 14.657 15.657 9l-1.414-1.414z" />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
