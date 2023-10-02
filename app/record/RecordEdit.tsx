"use client"
import { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import Button from "@mui/material/Button"
import { PostData as FieldFoodInput } from './api/route'
import  simpleFetch from '@/_lib/simpleFetch'
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar"
import { useRouter } from "next/navigation"
import RecordForm from "./RecordForm"
import { GetRecordsType } from "./_firebase/getRecords"

export interface RecordEditProps {
  record: GetRecordsType['list'][number]
}
export default function RecordEdit({ record }: RecordEditProps) {
  const {snackbarRef,snackbar} = useSnackbar()
  const [loading,setLoading] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const router = useRouter()

  const closeForm = () => {
    setFormOpen(false)
  }

  const openForm = () => {
    setFormOpen(true)
  }

  const submitForm: SubmitHandler<FieldFoodInput> = async (data) => {
    setLoading(true)
    const { success } = await simpleFetch.put(`/record/api/${record.groupId}/${record.id}`, data)
    if (success) {
      snackbar?.success({msg: '修改成功'})
      router.refresh()
      closeForm();
    } else {
      snackbar?.error({msg: '修改失敗'})
    }
    setLoading(false)
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={openForm}
        size="small"
      >
        編輯
      </Button>
      <RecordForm
        open={formOpen}
        onClose={closeForm}
        onSubmit={submitForm}
        submitText="儲存"
        loading={loading}
        values={record}
      />
      <StatusSnackbar ref={snackbarRef}/>
    </>
  )
}
