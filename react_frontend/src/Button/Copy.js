import PropTypes from 'prop-types'
import useClipboard from 'react-use-clipboard'

const ButtonCopy = ({ text }) => {
  const [isCopied, setCopied] = useClipboard(text, { successDuration: 1000 })

  if (!text) return null

  return (
    <button
      type="button"
      className="p-4 rounded bg-gray-800 hover:bg-gray-700 flex items-center mr-2 mb-2 whitespace-no-wrap"
      title="Copy text to clipboard"
      aria-label="Copy text to clipboard"
      onClick={setCopied}
    >
      <svg
        viewBox="0 0 20 20"
        className={`h-6 mr-4 fill-current ${isCopied && 'text-green-500'}`}
      >
        {isCopied ? (
          <path d="M15.6 4l-7.7 6.6-3.1-3.2L3 8.9l4.9 6.3L17 5.4z" />
        ) : (
          <path d="M18 13c0 .5-.4 1-1 1h-1V6c0-1.2-.9-2-2-2H6V3c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v10zm-4 4c0 .6-.4 1-1 1H3a1 1 0 01-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v10zM6 0C4.9 0 4 .8 4 2v2H2C.9 4 0 4.8 0 6v12c0 1 .9 2 2 2h12c1.1 0 2-1 2-2v-2h2c1.1 0 2-1 2-2V2c0-1.2-.9-2-2-2H6z" />
        )}
      </svg>

      {text}
    </button>
  )
}

ButtonCopy.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ButtonCopy
