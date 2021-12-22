import React, { useState } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import './ActionMenu.css';

/**
 * Three-dots menu for additional post actions.
 */

function ActionMenu({ isOwnedByUser, editPostHandler, deletePostHandler }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    editPostHandler();
  };

  const handleDelete = () => {
    handleClose();
    deletePostHandler();
  };

  return (
    <div>
      <IconButton
        className="dotsButton"
        onClick={handleClick}
        aria-label="more actions"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <MoreVert />
      </IconButton>
      <Menu
        className="actionMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dotsButton',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          disabled={!isOwnedByUser}
          onClick={handleEdit}
          aria-label="edit argot"
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit argot</ListItemText>
        </MenuItem>
        <MenuItem
          disabled={!isOwnedByUser}
          onClick={handleDelete}
          aria-label="delete argot"
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete argot</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

ActionMenu.propTypes = {
  /** If user did not submit the corresponding post, menu items are disabled. */
  isOwnedByUser: PropTypes.bool.isRequired,

  /** Callback when edit menu item is clicked. */
  editPostHandler: requiredIf(PropTypes.func, (props) => props.isOwnedByUser),

  /** Callback when delete menu item is clicked. */
  deletePostHandler: requiredIf(PropTypes.func, (props) => props.isOwnedByUser),
};

ActionMenu.defaultProps = {
  editPostHandler: null,
  deletePostHandler: null,
};

export default ActionMenu;
