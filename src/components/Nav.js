import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { MessageCircle } from 'react-feather';
import { MobileDrawer } from './MobileDrawer';
import './Nav.css';

export const Nav = () => {
  const theme = useTheme();
  const showTempDrawer = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <nav>
      <Link to="/" className="appBanner">
        <span className="appLogo">
          <MessageCircle size={36} />
        </span>
        <span className="appName">
          Argotique
        </span>
      </Link>
      {/* <AmplifySignOut /> */}
      {showTempDrawer && <MobileDrawer />}
    </nav>
  )
}