import React, { useState } from 'react';
import PropTypes from "prop-types"
import { Slider } from '@material-ui/core';

const NewSlider = ({ 
  step, marks, min, max, valueLabelDisplay, defaultValue, label, name, value,
  onChange,
  ...props
}) => {
  const [finalValue, setFinalValue] = useState(defaultValue || value)

  const handleChange = (e, _value) => {
    
    if(_value === value) return false

    onChange(_value, name)
    setFinalValue(_value)
  }

  return (
    <div>
      <label>{`${label}: ${finalValue}`}</label>
      <Slider
        id={name}
        onChange={handleChange}
        step={step}
        marks={marks}
        min={min}
        max={max}
        valueLabelDisplay={valueLabelDisplay}
        value={finalValue}
      />
    </div>
  )
}

NewSlider.propTypes = {
  onChange: PropTypes.func,
  step: PropTypes.number,
  marks: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  valueLabelDisplay: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
}

NewSlider.defaultProps = {
  onChange: () => {},
  step: 1,
  marks: false,
  min: 0,
  max: 100,
  value: 0,
  defaultValue: null,
  valueLabelDisplay: "auto",
  label: "",
  name: "",
};

export default NewSlider