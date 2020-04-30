import React from 'react';
import { Grid } from '@material-ui/core'
import PropTypes from "prop-types"
import classnames from 'classnames'

import './Default.scss'

const Default = ({ children, className }) => {
  return (
    <Grid container className={classnames("default-screen", className)} justify={"center"}>
      { children }
    </Grid>
  )
}

Default.propTypes = {
  className: PropTypes.string,
}

Default.defaultProps = {
  className: "",
};

export default Default