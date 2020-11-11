import PropTypes from 'prop-types'

const VARIANTS = {
  primary: 'py-2 px-4 rounded bg-green-500 hover:bg-green-700',
}

const Button = ({ variant, onClick, children, ...props }) => {
  return (
    <button
      className={VARIANTS[variant]}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(Object.keys(VARIANTS)).isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Button
