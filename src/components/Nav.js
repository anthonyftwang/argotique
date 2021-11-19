import React from 'react';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { MessageCircle } from 'react-feather';
import './Nav.css';

export const Nav = () => (
  <nav>
    <Link to="/" className="appBanner">
      <span className="appLogo">
        <MessageCircle size={36} />
      </span>
      <span className="appName">
        Argotique
      </span>
    </Link>
    <AmplifySignOut />
  </nav>
)