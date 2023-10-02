"use client"
import { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import Button from "@mui/material/Button"
import { PostData as FieldFoodInput } from './api/route'
import  simpleFetch from '@/_lib/simpleFetch'
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar"
import { useRouter } from "next/navigation"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RecordForm from "./RecordForm"

export default function RecordAdd() {
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
    const { success } = await simpleFetch.post('/record/api', data)
    if (success) {
      snackbar?.success({msg: '新增成功'})
      router.refresh()
      closeForm();
    } else {
      snackbar?.error({msg: '新增失敗'})
    }
    setLoading(false)
  }

  return (
    <>
      <Button
        className="mb-4"
        variant="contained"
        onClick={openForm}
        startIcon={<AddOutlinedIcon/>}
      >
        新增品項
      </Button>
      <RecordForm
        open={formOpen}
        onClose={closeForm}
        onSubmit={submitForm}
        submitText="新增"
        loading={loading}
      />
      <StatusSnackbar ref={snackbarRef}/>
    </>
  )
}
