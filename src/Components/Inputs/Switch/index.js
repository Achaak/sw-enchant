import React from 'react';
import PropTypes from "prop-types"
import { Switch } from '@material-ui/core';

const NewSwitch = ({ 
  onChange,
  ...props
}) => {

  const handleChange = (e) => {
    onChange(e.target.checked)
  }

  return (
    <Switch
      onChange={handleChange}
    />
  )
}

NewSwitch.propTypes = {
  onChange: PropTypes.func
}

NewSwitch.defaultProps = {
  onChange: () => {}
};

export default NewSwitch