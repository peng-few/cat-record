"use client"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { ReactNode, useEffect, useMemo, useState } from "react"
import Button from "@mui/material/Button"
import FormLabel from "@mui/material/FormLabel"
import MenuItem from "@mui/material/MenuItem"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import { PostData as FieldRecordInput } from "./api/route"
import { noop, typeNamesToOptions } from "@/_lib"
import {
  ValidateField,
  StyleForm,
  HorizontalFieldBox,
  Loading,
} from "@/_components"
import { useFoods } from "@/food/_components/FoodsContext"
import { useBrands } from "@/brand/_components/BrandsContext"
import { zodResolver } from "@hookform/resolvers/zod"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import FormHelperText from "@mui/material/FormHelperText"
import FormControlLabel from "@mui/material/FormControlLabel"
import { RecordStatus, RecordStatusName } from "./_data/RecordStatus"
import { DateTimePicker,DatePicker, TimePicker} from "@mui/x-date-pickers"
import dayjs from "dayjs"

export interface FoodFormProps {
  values?: Partial<FieldRecordInput>
  onSubmit: SubmitHandler<FieldRecordInput>
  onClose: () => void
  submitText: ReactNode
  loading: boolean
  open: boolean
}

export const DefaultValues = {}

export const FoodForm = ({
  onClose,
  values = DefaultValues,
  onSubmit: submitForm,
  submitText = "",
  loading = false,
  open = false,
}: FoodFormProps) => {
  const brands = useBrands()
  const foods = useFoods()
  const recordStatusOptions = useMemo(() => typeNamesToOptions(RecordStatusName), [])
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldRecordInput>({
    resolver: zodResolver(FieldRecordInput),
  })
  const [brand, setBrand] = useState<string>()
  const foodOptions = useMemo(() => {
    return foods?.filter((food) => food.brand === brand)
  }, [foods, brand])
  console.log(errors)
  useEffect(() => {
    const defaultValues = {
      ...values
    }
    reset(defaultValues)

    const defaultBrand = foods?.find((food) => food.id === values.foodId)?.brand
    setBrand(defaultBrand)
  }, [reset, values,foods])
  
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
        <FormControl className="label-name">
          <FormLabel>餵食</FormLabel>
        </FormControl>
        <HorizontalFieldBox sx={{ my: 2 }}>
          <HorizontalFieldBox merged sx={{ my: 0 }}>
            <TextField
              select
              label="品牌"
              value={brand}
              sx={{ minWidth: "100px" }}
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands?.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </TextField>
            <ValidateField<FieldRecordInput>
              select
              field="foodId"
              label="口味"
              value={watch('foodId')}
              sx={{ minWidth: "100px", mt: 2 }}
              errors={errors}
              disabled={typeof brand === 'undefined'}
              {...register("foodId")}
            >
              {foodOptions?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </ValidateField>
          </HorizontalFieldBox>
          <ValidateField<FieldRecordInput>
            field="amount"
            label="食用量"
            suffix="g"
            errors={errors}
            {...register("amount")}
          />
        </HorizontalFieldBox>
        <FormControl className="label-name mt-3">
          <FormLabel>加水</FormLabel>
        </FormControl>
        <ValidateField<FieldRecordInput>
          field="water"
          label="水量"
          suffix="g"
          errors={errors}
          sx={{ width: "100px" }}
          {...register("water")}
        />
        <HorizontalFieldBox sx={{ my: 2 }}>
          <DateTimePicker
            label="日期"
            value={dayjs(watch("date"))}
            format='YYYY/MM/DD HH:mm'
            {...register("date")}
            onChange={(newValue) => setValue('date',new Date(newValue)) }
          />
        </HorizontalFieldBox>
        <FormControl error={!!errors.status} sx={{ minWidth: "85px" }}>
          <FormLabel>狀態</FormLabel>
          <RadioGroup row>
            {recordStatusOptions.map((type) => (
              <FormControlLabel
                key={type.value}
                value={type.value}
                checked={watch('status') === type.value}
                control={<Radio />}
                label={type.label}
                {...register("status")}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{errors.status?.message}</FormHelperText>
        </FormControl>
        <Button type="submit" sx={{ mx: 1 }} variant="contained" size="large">
          {submitText}
        </Button>
      </StyleForm>
      <Loading loading={loading} />
    </SwipeableDrawer>
  )
}

export default FoodForm
