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
import MobileDrawer from 'components/MobileDrawer/MobileDrawer';
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

function Nav() {
  const theme = useTheme();
  const showTempDrawer = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <nav>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <div className="appBannerContainer">
              <Link to="/" className="appBanner">
                <span className="appLogo">
                  <MessageCircle size={32} />
                </span>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Argotique
                </Typography>
              </Link>
            </div>
            {showTempDrawer && <MobileDrawer />}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </nav>
  );
}

export default Nav;
