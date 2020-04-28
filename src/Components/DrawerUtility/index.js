import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import Drawer from '@material-ui/core/Drawer';

const DrawerUtility = ({}) => {
  const [open, setOpen] = useState(false)
  
  return (
    <Drawer anchor="right" open={open} onClose={() => {}}>
      <button onClick>Close</button>
    </Drawer>
  )
}

DrawerUtility.propTypes = {
}

DrawerUtility.defaultProps = {
};

export default DrawerUtility;
