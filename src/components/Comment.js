import React from 'react';
import { Link } from 'react-router-dom';
import { CardComponent as Card } from './Card';
import './Comment.css';

export const Comment = ({
  content,
  username,
  contentAge
}) => (
  <Card>
    <p className="commentMeta">
      <span className="commentAuthor">
        <Link to={`/user/${username}`}>{username}</Link>
      </span>
      <span className="commentAge">
        {" · "} {contentAge}
      </span>
    </p>
    <p className="commentText">{content}</p>
  </Card>
)