"use client"
import { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import  simpleFetch from '@/_lib/simpleFetch'
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar"
import { useRouter } from "next/navigation"
import BrandForm from "./BrandForm"
import { Brand } from "./_db/schema/BrandSchema"
import { useBrandEdit } from "./BrandEditProvider"

export default function BrandEdit() {
  const { snackbarRef, snackbar } = useSnackbar()
  const [loading,setLoading] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const { brandEdit,setBrandEdit } = useBrandEdit()
  const router = useRouter()

  const cancelEdit = () => {
    setBrandEdit({open: false})
  }

  const submitForm: SubmitHandler<Brand> = async (data) => {
    setLoading(true)
    const { success } = await simpleFetch.put(`/brand/api/${brandEdit.brand?._id}`, data)
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
      <BrandForm
        values={brandEdit.brand}
        open={brandEdit.open}
        onClose={cancelEdit}
        onSubmit={submitForm}
        submitText="儲存"
        loading={loading}
      />
      <StatusSnackbar ref={snackbarRef}/>
    </>
  )
}
