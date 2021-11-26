import React from 'react';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { DrawerMenu } from './DrawerMenu';

export const MobileDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <div>
      <IconButton
        className="dotsButton"
        onClick={toggleDrawer}
        aria-label="more"
        aria-controls="action-menu"
        aria-expanded={drawerOpen ? "true" : undefined}
        aria-haspopup="true"
      >
        <MenuOutlinedIcon color="secondary" />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            minWidth: "var(--argotique-drawer-min-width)"
          }
        }}
      >
        <DrawerMenu />
      </Drawer>
    </div>
  );
}