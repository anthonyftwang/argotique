import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { Typography, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Add, Sort } from '@mui/icons-material';
import './PostListHeader.css';

const sortOptions = ['Top', 'New', 'Active'];

function PostListHeader({
  titleText,
  showSort,
  showAdd,
  sortChangeHandler,
  addPostHandler,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSortButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickAddButton = () => {
    addPostHandler();
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    sortChangeHandler(sortOptions[index]);
    handleClose();
  };

  return (
    <div className="postListHeader">
      <Typography variant="h6" component="div" flexGrow={1}>
        {titleText}
      </Typography>
      <div className="postListHeaderButtons">
        {showSort && (
          <div className="sortMenu">
            <Tooltip title="Sort by">
              <IconButton
                aria-label="sort"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickSortButton}
              >
                <Sort />
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
                  onClick={() => handleMenuItemClick(index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
        {showAdd && (
          <Tooltip title="New argot">
            <IconButton aria-label="new argot" onClick={handleClickAddButton}>
              <Add />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

PostListHeader.propTypes = {
  titleText: PropTypes.string.isRequired,
  showSort: PropTypes.bool,
  showAdd: PropTypes.bool,
  sortChangeHandler: requiredIf(PropTypes.func, (props) => props.showSort),
  addPostHandler: requiredIf(PropTypes.func, (props) => props.showAdd),
};

PostListHeader.defaultProps = {
  showSort: false,
  showAdd: false,
  sortChangeHandler: null,
  addPostHandler: null,
};

export default PostListHeader;
