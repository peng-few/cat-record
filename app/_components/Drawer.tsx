'use client'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import { styled,Theme, CSSObject } from '@mui/material';
import { useState } from "react";
import IconButton from '@mui/material/IconButton'
import {Bars3Icon} from '@heroicons/react/24/outline'
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  ' .btn-expand': {
    display: 'none'
  }
});


const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  ' .btn-collapse': {
    display: 'none'
  },
  '.drawer-text': {
    visibility: 'hidden'
  }
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyleDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Drawer = ({ children, ...props }:DrawerProps) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <StyleDrawer open={open} {...props}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerOpen}  className='btn-expand'>
          <Bars3Icon className="w-7 h-7"/>
        </IconButton>
        <IconButton onClick={handleDrawerClose} className='btn-collapse'>
          <ArrowSmallLeftIcon className="w-7 h-7"/>
        </IconButton>
      </DrawerHeader>
      {children}
    </StyleDrawer>
  )
}

export default Drawer;