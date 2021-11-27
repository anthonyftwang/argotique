import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import './Comment.css';

export const Comment = ({
  content,
  username,
  contentAge
}) => (
  <Card className="postCard" variant="outlined">
    <CardContent sx={{
      "&:last-child": {
        paddingBottom: "16px"
      },
      "&": {
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem"
      },
    }}>
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
        {" · "}
        {contentAge}
      </Typography>
      <Typography className="commentText" variant="body1">
        {content}
      </Typography>
    </CardContent>
  </Card>
)