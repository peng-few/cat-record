"use client"
import { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { PostData as FieldFoodInput } from './api/route'
import  simpleFetch from '@/_lib/simpleFetch'
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar"
import { useRouter } from "next/navigation"
import FoodForm from "./FoodForm"
import { FieldFood } from "./_firebase"
import { unitConverter } from "@/_lib"

export interface FoodEditProps{
  food?: FieldFood,
  onClose: () => void,
  open: boolean
}


function FoodEdit({food,onClose: closeForm, open:formOpen}:FoodEditProps) {
  const {snackbarRef,snackbar} = useSnackbar()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toWetMatterBasis = unitConverter.toWetMatterBasis(food?.water)
  const percentageFood = {
    ...food,
    protein: toWetMatterBasis(food?.protein),
    fat: toWetMatterBasis(food?.fat),
    ash: toWetMatterBasis(food?.ash),
    fiber: toWetMatterBasis(food?.fiber)
  }

  const submitForm: SubmitHandler<FieldFoodInput> = async (data) => {
    setLoading(true)
    const { success } = await simpleFetch.put(`/food/api/${food?.id}`, data)
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
      <FoodForm
        open={formOpen}
        onClose={closeForm}
        onSubmit={submitForm}
        submitText="編輯"
        loading={loading}
        values={percentageFood}
      />
      <StatusSnackbar ref={snackbarRef}/>
    </>
  )
}

export default FoodEdit