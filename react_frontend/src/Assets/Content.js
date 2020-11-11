import useSWR from 'swr'

const Assets = () => {
  const { data } = useSWR(`/api/v1/assets/?from=0&size=20`)

  if (!data) return null

  const { assets } = data

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 p-1">
      {assets.map(({ id, name }) => {
        return (
          <div
            key={id}
            className="border-4 border-transparent hover:border-white"
          >
            <div
              className="relative bg-gray-900 w-full h-full flex justify-center items-center"
              style={{ paddingBottom: '100%' }}
            >
              <img
                className="absolute top-0 h-full w-full object-contain"
                src={`/api/v1/assets/${id}/thumbnail_file/`}
                alt={name}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Assets
