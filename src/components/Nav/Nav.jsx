import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { MessageCircle } from 'react-feather';
import MobileDrawer from 'components/MobileDrawer';
import './Nav.css';

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

/**
 * Top navigation bar with app branding and mobile menu toggle.
 */

function Nav({ username, position }) {
  const theme = useTheme();
  const showTempDrawer = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <nav>
      <ElevationScroll>
        <AppBar position={position}>
          <Toolbar>
            <div className="appBannerContainer">
              <Link to="/" className="appBanner" aria-label="home page">
                <span className="appLogo">
                  <MessageCircle size={32} />
                </span>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Argotique
                </Typography>
              </Link>
            </div>
            {showTempDrawer && <MobileDrawer username={username} />}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </nav>
  );
}

Nav.propTypes = {
  /** Username passed on to MobileDrawer component. */
  username: PropTypes.string.isRequired,
  /** Optional AppBar position prop for flexibility with docs. */
  position: PropTypes.string,
};

Nav.defaultProps = {
  position: 'fixed',
};

export default Nav;
