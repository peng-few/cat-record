'use client'
import { LocalizationProvider as MUI_LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReactNode } from 'react';

export const LocalizationProvider = ({children}: {children: ReactNode}) => {
  return (
    <MUI_LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </MUI_LocalizationProvider>
  )
}

export default LocalizationProvider