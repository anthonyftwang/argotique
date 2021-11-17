import React from 'react';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import './Nav.css';

export const Nav = () => (
  <nav>
    <span className="appName">
      <Link to="/">Argotique</Link>
    </span>
    <AmplifySignOut />
  </nav>
)