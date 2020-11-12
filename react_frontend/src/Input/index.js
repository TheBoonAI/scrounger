import PropTypes from 'prop-types'

const Input = ({ type, label, value, onChange }) => {
  return (
    <div className="w-full">
      <label className="text-sm font-bold mb-2">
        {label}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700"
          type={type}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'number', 'search']).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Input
