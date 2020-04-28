import React from 'react';
import PropTypes from "prop-types"
import Select from "react-select"

const NewSelect = ({ 
  options, noOptionsMessage, className, placeholder, label, onChange, onBlur, name, required, value, isMulti,
  ...props
}) => {
  const handleChange = (value) => {
    onChange(value)
  }

  return (
    <Select
      noOptionsMessage={noOptionsMessage}
      options={options}
      placeholder={placeholder}
      onChange={handleChange}
      id={name}
      styles={{ menu: styles => ({ ...styles, zIndex: 10 }) }}
      required={required}
      isMulti={isMulti}
    />
  )
}

NewSelect.propTypes = {
  options: PropTypes.array,
  className: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  isMulti: PropTypes.bool,
}

NewSelect.defaultProps = {
  options: [],
  className: 'select-default',
  noOptionsMessage: () => (<>Pas d'option</>),
  placeholder: "Selectionnez...",
  onChange: () => {},
  onBlur: () => {},
  name: "",
  required: false,
  value: {},
  isMulti: false,
};

export default NewSelect