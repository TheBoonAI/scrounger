import PropTypes from 'prop-types'

const Button = ({ onClick, children, ...props }) => {
  return (
    <button
      className="h-auto py-2 px-4 rounded bg-green-500 hover:bg-green-700 whitespace-no-wrap"
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Button
