'use client'
import * as React from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface ChipMenuProps extends Omit<ChipProps,'children'> {
  children: React.ReactNode,
  placeholder?: string
}

export default function ChipMenu({children,label,placeholder}: ChipMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        label={<>{label || placeholder}<ArrowDropDownIcon fontSize='small' /></>}
        onClick={handleClick}
        variant='outlined'
        color={label?"primary":"default"} 
      />
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  );
}