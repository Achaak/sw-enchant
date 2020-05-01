import React from 'react';
import PropTypes from "prop-types"

import './Button.scss'

const Button = ({
  children, className, disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      className={className}
      disabled={disabled}
    >
      { children }
    </button>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  disabled: false,
  className: 'button-default'
};

export default Button