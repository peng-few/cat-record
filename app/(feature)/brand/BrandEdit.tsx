"use client"
import { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import  simpleFetch from '@/_lib/simpleFetch'
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar"
import { useRouter } from "next/navigation"
import BrandForm from "./BrandForm"
import { Brand } from "./_db/schema/BrandSchema"
import IconButton from "@mui/material/IconButton"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { WithStringId } from "@/_types"

export interface BrandEditProps{
  brand: WithStringId<Brand>;
}

export default function BrandEdit({brand}: BrandEditProps) {
  const { snackbarRef, snackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter()

  const cancelEdit = () => {
    setIsFormOpen(false)
  }
  const openEdit = () => {
    setIsFormOpen(true)
  }

  const submitForm: SubmitHandler<Brand> = async (data) => {
    setLoading(true)
    const { success } = await simpleFetch.put(`/brand/api/${brand?._id}`, data)
    if (success) {
      snackbar?.success({msg: '編輯成功'})
      router.refresh()
      cancelEdit();
    } else {
      snackbar?.error({msg: '編輯失敗'})
    }
    setLoading(false)
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={openEdit}
        color="primary"
      >
        <ModeEditIcon fontSize="inherit"/>
      </IconButton>
      <BrandForm
        values={brand}
        open={isFormOpen}
        onClose={cancelEdit}
        onSubmit={submitForm}
        submitText="儲存"
        loading={loading}
      />
      <StatusSnackbar ref={snackbarRef}/>
    </>
  )
}
