"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { ReactNode } from "react"
import Button from "@mui/material/Button"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { noop, objToSelectOptions } from "@/_lib"
import { ValidateField, StyleForm, Loading } from "@/_components"
import { zodResolver } from "@hookform/resolvers/zod"
import { Brand, BrandSchema } from "./_db/schema/BrandSchema"
import { RegionTypeName } from "./_consts/RegionType"
import MenuItem from "@mui/material/MenuItem"

export interface BrandFormProps {
  values?: Partial<Brand>
  onSubmit: SubmitHandler<Brand>
  onClose: () => void
  submitText: ReactNode
  loading: boolean
  open: boolean
}
const regionOptions = objToSelectOptions(RegionTypeName)

export const BrandForm = ({
  onClose,
  values:defaultValues={},
  onSubmit: submitForm,
  submitText = "",
  loading = false,
  open = false,
}: BrandFormProps) => {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Brand>({
    resolver: zodResolver(BrandSchema),
    defaultValues: defaultValues,
  })

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
        <ValidateField<Brand>
          select
          className="flex-grow"
          label="地域"
          field="region"
          value={watch("region")}
          errors={errors}
          {...register("region")}
        >
          {regionOptions?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </ValidateField>
        <ValidateField<Brand>
          label="說明"
          className="flex-grow"
          field="remark"
          errors={errors}
          multiline
          rows={2}
          {...register("remark", { required: true })}
        />
        <Button type="submit" sx={{ mx: 1 }} variant="contained" size="large">
          {submitText}
        </Button>
      </StyleForm>
      <Loading loading={loading} />
    </SwipeableDrawer>
  )
}

export default BrandForm
