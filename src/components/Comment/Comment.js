import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Link, Typography } from '@mui/material';
import './Comment.css';

function Comment({ content, username, contentAge }) {
  return (
    <Card className="postCard" variant="outlined">
      <CardContent
        sx={{
          '&:last-child': {
            paddingBottom: '16px',
          },
          '&': {
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
          },
        }}
      >
        <Typography
          className="commentMeta"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          <Link
            component={RouterLink}
            to={`/user/${username}`}
            color="inherit"
            underline="hover"
          >
            {username}
          </Link>
          {' · '}
          {contentAge}
        </Typography>
        <Typography className="commentText" variant="body1">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  contentAge: PropTypes.string.isRequired,
};

export default Comment;
