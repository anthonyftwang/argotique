import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteDialog = (props) => {
  const closeDialog = () => {
    props.onClose();
  }

  const confirmDelete = () => {
    props.onSubmitHandler();
    closeDialog();
  }
  
  return(
    <Dialog
      open={props.open}
      onClose={closeDialog}
    >
      <DialogTitle>
        Delete post?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
            This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={confirmDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;