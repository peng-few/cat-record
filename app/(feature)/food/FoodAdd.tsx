"use client"
import { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import Button from "@mui/material/Button"
import  simpleFetch from '@/_lib/simpleFetch'
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar"
import { useRouter } from "next/navigation"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import FoodForm from "./FoodForm"
import { FoodFormRequest } from "./_db/schema/FoodFormRequestSchema"
import objToFormData from "@/_lib/objToFormData"

export default function FoodAdd() {
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

  const submitForm: SubmitHandler<FoodFormRequest> = async (data) => {
    const formData = objToFormData(data);
    const { success } = await simpleFetch.post('/food/api', formData)
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
        sx={{mb: 1.5}}
        variant="contained"
        onClick={openForm}
        startIcon={<AddOutlinedIcon />}
      >
        新增品項
      </Button>
      <FoodForm
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
