"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { ReactNode, useEffect } from "react"
import Button from "@mui/material/Button"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { noop } from "@/_lib"
import { ValidateField, StyleForm, Loading } from "@/_components"
import { zodResolver } from "@hookform/resolvers/zod"
import { Brand,BrandSchema } from "./_consts/BrandSchema"

export interface FoodFormProps {
  values?: Partial<Brand>,
  onSubmit: SubmitHandler<Brand>,
  onClose: () => void,
  submitText: ReactNode,
  loading: boolean,
  open: boolean,
}

export const FoodForm = ({
  onClose,
  values,
  onSubmit: submitForm,
  submitText='',
  loading = false,
  open = false,
}: FoodFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Brand>({
    resolver: zodResolver(BrandSchema)
  })

  useEffect(() => {
    const defaultValues = {
      ...values
    };
    reset(defaultValues)
  },[reset,values])

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onOpen={noop}
      onClose={onClose}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <StyleForm onSubmit={handleSubmit(submitForm)}>
        <ValidateField<Brand>
            label="品牌"
            className="flex-grow"
            field="name"
            errors={errors}
            {...register("name", { required: true })}
          />
          <Button type="submit" sx={{ mx: 1 }} variant="contained" size="large">
            {submitText}
          </Button>
      </StyleForm>
      <Loading loading={loading}/>
    </SwipeableDrawer>
  )
}

export default FoodForm