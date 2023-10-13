'use client'
import { useFocusedBox } from './FocusedBoxProvider';
import { SxProps, Theme,alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

export interface FocusedBoxProps extends BoxProps{
  id: any;
}

const cssRow:SxProps<Theme> = {
  '&.focus': {
    background: (theme) => alpha(theme.palette.primary.light,0.2),
  } 
}

export const FocusedBox = ({sx,id,...props}:FocusedBoxProps ) => {
  const { focusedBox, setFocusedBox } = useFocusedBox()
  const isFocusBox = (id:any) => id === focusedBox;

  return (
    <Box
      {...props}
      sx={{ ...cssRow,...sx }}
      onClick={() => setFocusedBox(id)}
      className={isFocusBox(id) ?'focus' : ''}
    />
  )
}

export default FocusedBox