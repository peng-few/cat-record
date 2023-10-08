'use client'
import MuiAlert,{ AlertProps } from '@mui/material/Alert'
import Snackbar from "@mui/material/Snackbar";
import React, { ReactNode, useState,useRef } from "react";


export interface SnackbarHandler{
  error: (props: SnackbarHandlerProps) => void;
  info: (props: SnackbarHandlerProps) => void;
  success: (props: SnackbarHandlerProps) => void;
  warning: (props: SnackbarHandlerProps) => void
  close: (props: SnackbarHandlerProps) => void;
}

export type SnackbarHandlerProps = {
  msg?: ReactNode
}

export function useSnackbar() {
  const snackbarRef = useRef<SnackbarHandler>(null)
  const snackbar = snackbarRef.current;

  return { snackbarRef, snackbar }
}


export const StatusSnackbar = React.forwardRef<SnackbarHandler,AlertProps>(function StatusSnackbar(props ,ref) {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertProps['severity']>('success')
  const [msg,setMsg] = useState<ReactNode>()
  
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  React.useImperativeHandle(ref, () => ({
    error: ({ msg = '操作失敗' }:SnackbarHandlerProps) => {
      setMsg(msg)
      setSeverity('error')
      handleOpen()
    },
    info: ({ msg = '操作訊息' }: SnackbarHandlerProps) => {
      setMsg(msg)
      setSeverity('info')
      handleOpen()
    },
    success: ({ msg = '操作成功' }: SnackbarHandlerProps) => {
      setMsg(msg)
      setSeverity('success')
      handleOpen()
    },
    warning: ({ msg = '警告' }: SnackbarHandlerProps) => {
      setMsg(msg)
      setSeverity('warning')
      handleOpen()
    },
    close: handleClose,
  }));

  return (
    <Snackbar
      open={open}
      autoHideDuration={1300}
      onClose={handleClose}
    >
      <MuiAlert
          onClose={handleClose} elevation={6} variant="filled" severity={severity} {...props}>
        {msg}
      </MuiAlert>
    </Snackbar>
  )

})

export default StatusSnackbar