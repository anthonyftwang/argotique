import React, { useState, useEffect } from 'react';
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

function DrawerMenu({ handleDrawerItemClick }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const wideScreen = !useMediaQuery(theme.breakpoints.down('md'));

  async function fetchUser() {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    setUser(cognitoUser);
  }

  useEffect(() => {
    fetchUser();
  }, []);

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
              name={user?.username}
              variant="beam"
              colors={['#0055a4', '#ef4135']}
            />
          </div>
          <Typography
            component="div"
            sx={{ mt: 2, mb: 1, textAlign: 'center' }}
          >
            {user?.username}
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleNavItemClick('/')}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleNavItemClick(
                  `/user/${user ? user.username : ''}`
                )}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="My posts" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleNavItemClick('/liked')}>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="Liked posts" />
              </ListItemButton>
            </ListItem>
            <ListItem />
            <ListItem
              disablePadding
              secondaryAction={<OpenInNew color="action" />}
            >
              <ListItemButton onClick={handleExternalItemClick('/')}>
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
              <ListItemButton onClick={handleExternalItemClick('/terms')}>
                <ListItemIcon>
                  <Notes />
                </ListItemIcon>
                <ListItemText primary="Terms &#38; Privacy" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOutClick}>
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
  handleDrawerItemClick: PropTypes.func.isRequired,
};

export default DrawerMenu;
