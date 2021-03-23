import PropTypes from 'prop-types'

const SimilaritySearchThumbnail = ({ assetId, src, onClick }) => {
  return (
    <div className="relative pr-2 group">
      <img
        className="h-20 sm:h-32 object-contain"
        src={src}
        alt={`Similarity search item: ${assetId}`}
      />

      <button
        type="button"
        title="Remove from similarity search"
        aria-label="Remove from similarity search"
        className="absolute top-0 right-0 p-1 mt-1 mr-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100 rounded-full bg-gray-800 bg-opacity-75 hover:text-green-500 hover:bg-opacity-100"
        onClick={onClick}
      >
        <svg viewBox="0 0 20 20" className="h-5 stroke-current stroke-2">
          <line x1="5" y1="5" x2="15" y2="15" />
          <line x1="5" y1="15" x2="15" y2="5" />
        </svg>
      </button>
    </div>
  )
}

SimilaritySearchThumbnail.propTypes = {
  assetId: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SimilaritySearchThumbnail
