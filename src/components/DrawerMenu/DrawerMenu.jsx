import React from 'react';
import PropTypes from 'prop-types';
import Auth from '@aws-amplify/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home,
  Person,
  Favorite,
  Logout,
  InfoOutlined,
  OpenInNew,
  Notes,
} from '@mui/icons-material';
import Avatar from 'boring-avatars';
import './DrawerMenu.css';

/**
 * Side menu for navigation between key app links.
 */

function DrawerMenu({ username, handleDrawerItemClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const wideScreen = !useMediaQuery(theme.breakpoints.down('md'));

  const handleNavItemClick = (path) => () => {
    if (!(wideScreen || handleDrawerItemClick === undefined)) {
      handleDrawerItemClick();
    }
    if (
      path.split('/')[1] === location.pathname.split('/')[1] &&
      path !== location.pathname
    ) {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  const handleExternalItemClick = (path) => () => {
    window.open(`https://argotique.net${path}`, '_blank').focus();
  };

  const handleSignOutClick = () => {
    Auth.signOut().then(() => {
      window.location.reload(false);
    });
  };

  return (
    <div className={wideScreen ? 'desktopMenu' : 'mobileMenu'}>
      <Card variant="outlined" sx={{ border: wideScreen ? 'default' : 'none' }}>
        <CardContent>
          <div className="avatarContainer">
            <Avatar
              size={64}
              name={username}
              variant="beam"
              colors={['#0055a4', '#ef4135']}
            />
          </div>
          <Typography
            component="div"
            sx={{ mt: 2, mb: 1, textAlign: 'center' }}
          >
            {username}
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleNavItemClick('/')}
                aria-label="home page"
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home page" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleNavItemClick(`/user/${username}`)}
                aria-label="my argots"
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="My argots" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleNavItemClick('/liked')}
                aria-label="liked argots"
              >
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="Liked argots" />
              </ListItemButton>
            </ListItem>
            <ListItem />
            <ListItem
              disablePadding
              secondaryAction={<OpenInNew color="action" />}
            >
              <ListItemButton
                onClick={handleExternalItemClick('/')}
                aria-label="about"
              >
                <ListItemIcon>
                  <InfoOutlined />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              secondaryAction={<OpenInNew color="action" />}
            >
              <ListItemButton
                onClick={handleExternalItemClick('/terms')}
                aria-label="terms and privacy"
              >
                <ListItemIcon>
                  <Notes />
                </ListItemIcon>
                <ListItemText primary="Terms &#38; Privacy" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSignOutClick}
                aria-label="sign out"
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

DrawerMenu.propTypes = {
  /** Determines username and avatar to display. */
  username: PropTypes.string.isRequired,
  /** Callback when any item in the menu is clicked.
   * Use to close sliding drawer on mobile browsers. */
  handleDrawerItemClick: PropTypes.func,
};

DrawerMenu.defaultProps = {
  handleDrawerItemClick: null,
};

export default DrawerMenu;
