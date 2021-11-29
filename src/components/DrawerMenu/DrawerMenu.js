import React from 'react';
import { useState, useEffect } from 'react';
import Auth from '@aws-amplify/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from 'boring-avatars';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import NotesIcon from '@mui/icons-material/Notes';
import './DrawerMenu.css';

const DrawerMenu = (props) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const wideScreen = !useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
  }

  const handleNavItemClick = (path) => () => {
    if (!(wideScreen || props.handleDrawerItemClick === undefined)) {
      props.handleDrawerItemClick();
    }
    if (path.split("/")[1] === location.pathname.split("/")[1]
      && path !== location.pathname) {
      window.location.href = path;
    }
    else {
      navigate(path);
    }
  }

  const handleExternalItemClick = (path) => () => {
    window.open(`https://argotique.net${path}`, "_blank").focus();
  }

  const handleSignOutClick = () => {
    Auth.signOut().then(() => {
      window.location.reload(false); 
    });
  }

  return (
    <div className={wideScreen ? "desktopMenu" : "mobileMenu"}>
      <Card variant="outlined" sx={{border: wideScreen ? "default" : "none"}}>
        <CardContent>
          <div className="avatarContainer">
            <Avatar
              size={64}
              name={user?.username}
              variant="beam"
              colors={["#0055a4", "#ef4135"]}
            />
          </div>
          <Typography component="div" sx={{mt: 2, mb: 1, textAlign:"center"}}>
            {user?.username}
          </Typography>
          <List sx={{ width: "100%", maxWidth: 360}}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleNavItemClick("/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleNavItemClick(`/user/${user ? user.username : ""}`)}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="My posts" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleNavItemClick("/liked")}>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Liked posts" />
              </ListItemButton>
            </ListItem>
            <ListItem></ListItem>
            <ListItem
              disablePadding
              secondaryAction={
                <OpenInNewIcon color="action" />
              }
            >
              <ListItemButton onClick={handleExternalItemClick("/")}>
                <ListItemIcon>
                  <InfoOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="About"/>
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              secondaryAction={
                <OpenInNewIcon color="action" />
              }
            >
              <ListItemButton onClick={handleExternalItemClick("/terms")}>
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText primary="Terms &#38; Privacy" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOutClick}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  )
}

export default DrawerMenu;