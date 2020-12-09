import PropTypes from 'prop-types'

import { importInPremiere } from './helpers'

const AdobePremiereImport = ({ id, name }) => {
  if (typeof window.cep === 'undefined') return null

  return (
    <button
      type="button"
      title="Import in Adobe Premiere"
      aria-label="Import in Adobe Premiere"
      className="absolute top-0 left-0 p-2 m-2 rounded-full bg-gray-800 bg-opacity-75 hover:bg-opacity-100 text-white hover:text-green-500 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100"
      onClick={(event) => {
        event.stopPropagation()

        importInPremiere({
          url: `/api/v1/assets/${id}/highres_file`,
          name,
        })
      }}
    >
      <svg
        className="fill-current h-5 transform rotate-180"
        viewBox="0 0 20 20"
      >
        <path d="M10 4l7 9h-4.2v7.2H7.2V13H3l7-9zm7-4v2H3V0h14z" />
      </svg>
    </button>
  )
}

AdobePremiereImport.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default AdobePremiereImport
