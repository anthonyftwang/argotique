import React, { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import DrawerMenu from 'components/DrawerMenu/DrawerMenu';

function MobileDrawer() {
  const [drawerOpen, setDrawerOpen] = useState();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <IconButton
        className="dotsButton"
        onClick={toggleDrawer}
        aria-label="more"
        aria-controls="action-menu"
        aria-expanded={drawerOpen ? 'true' : undefined}
        aria-haspopup="true"
      >
        <MenuOutlined color="secondary" />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            minWidth: 'var(--argotique-drawer-min-width)',
          },
        }}
      >
        <DrawerMenu handleDrawerItemClick={toggleDrawer} />
      </Drawer>
    </div>
  );
}

export default MobileDrawer;
