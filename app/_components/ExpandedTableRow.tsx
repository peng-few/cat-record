'use client'
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import FocusedTableRow from './FocusdTableRow';


export interface ExpandedTableRowProps extends TableRowProps{
  detail: React.ReactNode;
  colSpan: number;
  id: any;
}

const cssRow:SxProps<Theme> = {
  '&:last-child td, &:last-child th': { border: 0 },
  '& > *': { borderBottom: 'unset' },
}

export const ExpandedTableRow = ({detail,children,sx,colSpan,id,...props}:ExpandedTableRowProps ) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FocusedTableRow
        {...props}
        id={id}
        sx={{...cssRow, ...sx }}
      >
        <TableCell sx={{width: '65px'}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronUpIcon className='w-6 h-6'/> : <ChevronDownIcon className='w-6 h-6'/>}
          </IconButton>
        </TableCell>
        {children}
      </FocusedTableRow>
      <TableRow>
        <TableCell sx={{ padding: 0 }} colSpan={colSpan}>
          <Collapse sx={{borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`}} in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <>
              {detail}
              </>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
  </>
  )
}

export default ExpandedTableRow