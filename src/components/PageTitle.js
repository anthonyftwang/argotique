import React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './PageTitle.css';

import { useNavigate } from 'react-router-dom';

const sortOptions = [
  "Top",
  "Newest",
  "Active"
];

export const PageTitle = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  let navigate = useNavigate();

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
      <h2>{props.titleText}</h2>
      <div className="pageTitleButtons">
        {props.showSort &&
          <div className="sortMenu">
            <IconButton
              aria-label="sort"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickSortButton}
            >
              <SortIcon/>
            </IconButton>
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
        <IconButton
          aria-label="new post"
          onClick={handleClickAddButton}
        >
          <AddIcon/>
        </IconButton>
      </div>
    </div>
  );
};