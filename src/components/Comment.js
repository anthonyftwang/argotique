import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '/.Card';
import './Comment.css';

export const Comment = ({
  content,
  username,
  contentAge
}) => (
  <Card>
    <p className="contentMeta">
      <span className="contentAuthor">
        <Link to={`/user/${username}`}>{username}</Link>
      </span>
      <span className="contentAge">
        {"·"} {contentAge}
      </span>
    </p>
    <p className="contentText">{content}</p>
  </Card>
)