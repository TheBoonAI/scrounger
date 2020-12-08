import { importInPremiere } from './helpers'

const AdobePremiere = ({ id, name }) => {
  return (
    <button
      type="button"
      title="Import in Adobe Premiere"
      aria-label="Import in Adobe Premiere"
      className="absolute top-0 right-0 p-2 m-2 rounded-full bg-gray-800 bg-opacity-75 hover:bg-opacity-100 text-white hover:text-green-500 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100"
      onClick={(event) => {
        event.stopPropagation()

        importInPremiere({
          url: `/api/v1/assets/${id}/highres_file`,
          name,
        })
      }}
    >
      <svg className="fill-current h-5" viewBox="0 0 20 20">
        <path d="M12 0a8 8 0 013.293 15.293A8 8 0 114.708 4.707 8 8 0 0112 0zM4.014 7.516l-.106.096a6 6 0 108.577 8.374 8 8 0 01-8.47-8.47zM8 6a6 6 0 00-1.743.257 6 6 0 007.486 7.486A6 6 0 008 6zm4-4a5.985 5.985 0 00-4.485 2.014 8 8 0 018.47 8.47A6 6 0 0012 2z" />
      </svg>
    </button>
  )
}

export default AdobePremiere
