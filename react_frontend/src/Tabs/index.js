import Router, { useRouter } from 'next/router'

import { getQueryString } from '../Query/helpers'

const TYPES = [
  { key: 'all', name: 'All', label: 'Show all' },
  { key: 'image', name: 'Images', label: 'Show images only' },
  { key: 'video', name: 'Videos', label: 'Show videos only' },
  { key: 'document', name: 'Documents', label: 'Show documents only' },
]

const Tabs = () => {
  const {
    pathname,
    query,
    query: { t = 'all' },
  } = useRouter()

  return (
    <div>
      {TYPES.map(({ key, name, label }) => (
        <button
          key={key}
          aria-label={label}
          title={label}
          type="button"
          onClick={() =>
            Router.push(
              `${pathname}${getQueryString({
                ...query,
                t: key === 'all' ? '' : key,
              })}`,
            )
          }
          className={`px-1 sm:px-4 py-2 border-b-2 border-transparent ${
            t === key && 'text-green-500 border-green-500'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default Tabs
