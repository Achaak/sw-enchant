import React from 'react';
import PropTypes from "prop-types"
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewDialog = ({ 
  open,
  dialogTitle, dialogContent, dialogActions,
  children,
}) => {
  const handleClose = () => {
    
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        { dialogTitle }
      </DialogTitle>

      <DialogContent>
        { dialogContent }
      </DialogContent>

      <DialogActions>
        { dialogActions }
      </DialogActions>
    </Dialog>
  );
}

NewDialog.propTypes = {
  open: PropTypes.bool,
  dialogTitle: PropTypes.object,
  dialogContent: PropTypes.object,
  dialogActions: PropTypes.object,
}

NewDialog.defaultProps = {
  open: false,
  dialogTitle: (<></>),
  dialogContent: (<></>),
  dialogActions: (<></>),
};

export default NewDialog
