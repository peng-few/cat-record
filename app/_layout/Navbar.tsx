'use client'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import { styled,Theme, CSSObject } from '@mui/material/styles';
import { useState } from "react";
import IconButton from '@mui/material/IconButton'
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import PetsIcon from '@mui/icons-material/Pets';

const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
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
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  '.btn-expand': {
    display: 'none'
  },
  '&.open': {
    justifyContent: 'flex-end',
    '.btn-fold': {
      display: 'none'
    },
    ' .btn-expand': {
      display: 'inline-flex'
    }
  },
}));

const StyleDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '.MuiDrawer-paper': {
      borderRight: '0',
      background: '#f5f5f5',
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      '& .drawer-text': {
        display: 'none'
      }
    }),
  }),
);

export const Navbar = ({ children, ...props }:DrawerProps) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <StyleDrawer open={open} {...props} variant="permanent">
      <DrawerHeader className={open?'open': ''}>
        <IconButton onClick={handleDrawerOpen}  className='btn-fold'>
          <PetsIcon color='primary'/>
        </IconButton>
        <IconButton onClick={handleDrawerClose} className='btn-expand'>
          <WestOutlinedIcon fontSize='small' color='primary'/>
        </IconButton>
      </DrawerHeader>
      {children}
    </StyleDrawer>
  )
}

export default Navbar;