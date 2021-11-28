import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import './PageTitle.css';

const sortOptions = [
  "Top",
  "New",
  "Active"
];

export const PageTitle = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const open = Boolean(anchorEl);
  
  const handleClickSortButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    props.sortChangeHandler(sortOptions[index]);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAddButton = () => {
    props.addPostHandler();
  }

  return (
    <div className="pageTitleRow">
      <Typography variant="h6" component="div" flexGrow={1}>
        {props.titleText}
      </Typography>
      <div className="pageTitleButtons">
        {props.showSort &&
          <div className="sortMenu">
            <Tooltip title="Sort by">
              <IconButton
                aria-label="sort"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickSortButton}
              >
                <SortIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {sortOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        }
        {props.showAdd &&
          <Tooltip title="New post">
            <IconButton
              aria-label="new post"
              onClick={handleClickAddButton}
            >
              <AddIcon/>
            </IconButton>
          </Tooltip>
        }
      </div>
    </div>
  );
};