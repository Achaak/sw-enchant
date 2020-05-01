import React, {useState} from 'react';
import PropTypes from "prop-types"

import './Input.scss'

const Input = ({ 
  type, placeholder, required, className, value, name, setFieldValue,
  onChange,
  ...props
}) => {
  const [finalValue, setFinalValue] = useState(value);

  const handleChange = (e) => {
    onChange(e.target.value)
    setFieldValue(name, e.target.value)

    setFinalValue(e.target.value)
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      required={required}
      className={className}
      value={finalValue}
      id={name}
    />
  )
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
  className: 'input-default',
  onChange: () => {},
  setFieldValue: () => {},
  value: '',
  name: '',
};

export default Input