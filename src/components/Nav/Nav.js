import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MessageCircle } from 'react-feather';
import MobileDrawer from 'components/MobileDrawer/MobileDrawer';
import './Nav.css';

function ElevationScroll(props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(props.children, {
    elevation: trigger ? 4 : 0,
  });
}

const Nav = (props) => {
  const theme = useTheme();
  const showTempDrawer = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <nav>
      <ElevationScroll {...props}>
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
  )
}

export default Nav;