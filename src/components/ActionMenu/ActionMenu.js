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
        aria-label="more"
        aria-controls="action-menu"
        aria-expanded={open ? 'true' : undefined}
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
        <MenuItem disabled={!isOwnedByUser} onClick={handleEdit}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit post</ListItemText>
        </MenuItem>
        <MenuItem disabled={!isOwnedByUser} onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete post</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

ActionMenu.propTypes = {
  isOwnedByUser: PropTypes.bool.isRequired,
  editPostHandler: requiredIf(PropTypes.func, (props) => props.isOwnedByUser),
  deletePostHandler: requiredIf(PropTypes.func, (props) => props.isOwnedByUser),
};

ActionMenu.defaultProps = {
  editPostHandler: null,
  deletePostHandler: null,
};

export default ActionMenu;
