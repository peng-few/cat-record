'use client'
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import { type ReactElement } from 'react';
import { useFocusedRow} from './FocusedRowProvider';
import { SxProps, Theme,alpha } from '@mui/material/styles';

export interface FocusedTableRowProps extends TableRowProps{
  detail: ReactElement;
  colSpan: number;
  id: any;
}

const cssRow:SxProps<Theme> = {
  '&.focus': {
    background: (theme) => alpha(theme.palette.primary.light,0.5),
  } 
}

export const FocusedTableRow = ({sx,id,...props}:TableRowProps ) => {
  const { focusedRow, setFocusedRow } = useFocusedRow()
  const isFocusRow = (id:any) => id === focusedRow;

  return (
    <TableRow
      {...props}
      sx={{ ...cssRow,...sx }}
      onClick={() => setFocusedRow(id)}
      className={isFocusRow(id) ?'focus' : ''}
    />
  )
}

export default FocusedTableRow