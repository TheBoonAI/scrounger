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
    query: { t = 'all', q, s, dl },
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
                dl,
                q,
                t: key === 'all' ? '' : key,
                s,
              })}`,
            )
          }
          className={`px-2 sm:px-4 py-2 border-b-2 border-transparent hover:bg-gray-800 rounded-t-lg ${
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
