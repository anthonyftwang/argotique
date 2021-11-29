import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import './ActionMenu.css';

const ActionMenu = (props) => {
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
    props.editPostHandler();
  };

  const handleDelete = () => {
    handleClose();
    props.deletePostHandler();
  };

  return (
    <div>
      <IconButton
        className="dotsButton"
        onClick={handleClick}
        aria-label="more"
        aria-controls="action-menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        className="actionMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "dotsButton"
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem disabled={!props.isOwnedByUser} onClick={handleEdit}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit post</ListItemText>
        </MenuItem>
        <MenuItem disabled={!props.isOwnedByUser} onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete post</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ActionMenu;