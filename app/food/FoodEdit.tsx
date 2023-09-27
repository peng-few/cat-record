"use client"
import { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { PostData as FieldFoodInput } from './api/route'
import  simpleFetch from '@/_lib/simpleFetch'
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar"
import { useRouter } from "next/navigation"
import FoodForm from "./FoodForm"
import { useBrands } from "@/brand/_components/BrandsContext"
import { FieldFood } from "./_firebase"

export interface FoodEditProps{
  food?: FieldFood,
  onClose: () => void,
  open: boolean
}


function FoodEdit({food,onClose: closeForm, open:formOpen}:FoodEditProps) {
  const {snackbarRef,snackbar} = useSnackbar()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submitForm: SubmitHandler<FieldFoodInput> = async (data) => {
    setLoading(true)
    const { success } = await simpleFetch.put(`/food/api/${food?.id}`, data)
    if (success) {
      await simpleFetch.post('/api/revalidate?tag=foods')
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
      <FoodForm
        open={formOpen}
        onClose={closeForm}
        onSubmit={submitForm}
        submitText="編輯"
        loading={loading}
        values={food}
      />
      <StatusSnackbar ref={snackbarRef}/>
    </>
  )
}

export default FoodEdit