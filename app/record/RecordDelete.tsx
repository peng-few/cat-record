'use client'
import React,{ useState } from "react";
import ConfirmDialog from "@/_components/ConfirmDialog";
import { simpleFetch } from "@/_lib";
import { useRouter } from "next/navigation"
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar";
import Button,{ ButtonProps } from "@mui/material/Button";

export interface RecordDeleteProps extends Omit<ButtonProps,'id'>{
  id: string
  groupId: string
}

export const RecordDelete = ({ id,groupId,...props }:RecordDeleteProps) => {
  const [actionStatus, setActionStatus] = useState<
    | 'NONE'
    | 'DELETE_CONFIRM'
    | 'SENDING'>('NONE');
  
  const { snackbarRef, snackbar } = useSnackbar()
  const router = useRouter()

  const closeAll = () => {
    setActionStatus('NONE');
  };

  const confirmDelete = () => {
    setActionStatus('DELETE_CONFIRM')
  }

  const deleteRecord = async () => {
    setActionStatus('SENDING')
    const { success } = await simpleFetch.delete(`record/api/${groupId}/${id}`)
    if (success) {
      router.refresh()
      snackbar?.success({msg: '刪除成功'})
    } else {
      snackbar?.error({msg: '刪除失敗'})
    }
    setActionStatus('NONE')
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={confirmDelete}
        size="small"
        {...props}
      >
        刪除
      </Button>
      <ConfirmDialog
        open={actionStatus === 'DELETE_CONFIRM' || actionStatus === 'SENDING'}
        onCancel={closeAll}
        onOk={deleteRecord}
        loading={actionStatus === 'SENDING'}
      >
        確認要刪除此項?
      </ConfirmDialog>
      <StatusSnackbar ref={snackbarRef}/>
    </>
  )
}

export default RecordDelete