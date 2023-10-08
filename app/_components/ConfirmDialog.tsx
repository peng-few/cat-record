import Button from "@mui/material/Button"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Dialog from "@mui/material/Dialog"
import React from "react"
import { Loading } from "."

export interface ConfirmationDialogProps {
  children: React.ReactNode
  open: boolean
  onCancel: () => void
  onOk: () => void
  loading?: boolean
}

export const ConfirmDialog = ({
  children,
  onCancel: handleCancel,
  onOk: handleOk,
  open,
  loading,
  ...rest
}: ConfirmationDialogProps) => {

  return (
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        onClose={handleCancel}
        {...rest}
      >
        <Loading loading={loading} />
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>取消</Button>
          <Button variant="contained" onClick={handleOk}>
            確定
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default ConfirmDialog
