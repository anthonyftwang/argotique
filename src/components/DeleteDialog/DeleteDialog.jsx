import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

/**
 * Confirmation dialog for deleting posts.
 */

function DeleteDialog({ open, onClose, onSubmitHandler }) {
  const closeDialog = () => {
    onClose();
  };

  const confirmDelete = () => {
    onSubmitHandler();
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Delete post?</DialogTitle>
      <DialogContent>
        <DialogContentText>This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} aria-label="cancel delete">
          Cancel
        </Button>
        <Button onClick={confirmDelete} aria-label="confirm delete">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  /** Determines whether dialog is visible. */
  open: PropTypes.bool,
  /** Callback when dialog is closed. */
  onClose: PropTypes.func.isRequired,
  /** Callback when dialog is confirmed. */
  onSubmitHandler: PropTypes.func.isRequired,
};

DeleteDialog.defaultProps = {
  open: false,
};

export default DeleteDialog;
