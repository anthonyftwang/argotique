import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, IconButton } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import DrawerMenu from 'components/DrawerMenu/DrawerMenu';

/**
 * Hamburger side drawer to access navigation menu on mobile devices.
 */

function MobileDrawer({ username }) {
  const [drawerOpen, setDrawerOpen] = useState();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <IconButton
        className="drawerButton"
        id="drawer-toggle"
        onClick={toggleDrawer}
        aria-label="toggle drawer"
        aria-expanded={drawerOpen ? 'true' : undefined}
      >
        <MenuOutlined color="secondary" />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        role="navigation"
        aria-label="drawer menu"
        sx={{
          '& .MuiDrawer-paper': {
            minWidth: 'var(--argotique-drawer-min-width)',
          },
        }}
      >
        <DrawerMenu username={username} handleDrawerItemClick={toggleDrawer} />
      </Drawer>
    </div>
  );
}

MobileDrawer.propTypes = {
  /** Username passed on to DrawerMenu component. */
  username: PropTypes.string.isRequired,
};

export default MobileDrawer;
