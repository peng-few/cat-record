"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { FoodType, FoodTypeName, isDry } from "./_data/FoodTypes"
import { EnergyTypeOptions } from "./_data/EnergyTypes"
import { ReactNode, useEffect, useMemo } from "react"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import FormHelperText from "@mui/material/FormHelperText"
import FormControlLabel from "@mui/material/FormControlLabel"
import Button from "@mui/material/Button"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { PostData as FieldFoodInput, PhosUnitType } from './api/route'
import { noop, numberPattern } from "@/_lib"
import { ValidateField, StyleForm, HorizontalFieldBox, Loading } from "@/_components"
import { FieldBrand } from "@/brand/_firebase"
import { getUnitOptions } from "@/_data/UnitType"

export interface FoodFormProps {
  brands?: FieldBrand[]
  values?: Partial<FieldFoodInput>,
  onSubmit: SubmitHandler<FieldFoodInput>,
  onClose: () => void,
  submitText: ReactNode,
  loading: boolean,
  open: boolean,
}

export const DefaultValues = {}

export const FoodForm = ({
  brands,
  onClose,
  values= DefaultValues,
  onSubmit: submitForm,
  submitText='',
  loading = false,
  open = false,
}: FoodFormProps) => {
  const phosUnitOptions = useMemo(() => getUnitOptions(PhosUnitType.Values), [])
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldFoodInput>()

  useEffect(() => {
    const defaultValues = {
      energyType: EnergyTypeOptions[0].value,
      type: FoodType.enum.Wet,
      ...values,
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
        <FormControl error={!!errors.type} sx={{ minWidth: "85px" }}>
          <FormLabel>類型</FormLabel>
          <RadioGroup row>
            {(Object.keys(FoodTypeName) as FoodType[]).map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                checked={watch('type') === type}
                control={<Radio />}
                label={FoodTypeName[type]}
                {...register("type", { required: "請選擇乾/濕食" })}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{errors.type?.message}</FormHelperText>
        </FormControl>
        <HorizontalFieldBox>
          <ValidateField<FieldFoodInput>
            select
            className="flex-grow"
            label="品牌"
            field="brand"
            defaultValue={watch('brand')}
            errors={errors}
            {...register("brand", { required: "請選擇品牌"})}
          >
            {brands?.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </ValidateField>
          <ValidateField<FieldFoodInput>
            label="品名"
            className="flex-grow"
            field="name"
            errors={errors}
            {...register("name", { required: true })}
          />
        </HorizontalFieldBox>
        <HorizontalFieldBox>
          <HorizontalFieldBox merged sx={{ my: 0 }}>
            <ValidateField<FieldFoodInput>
              select
              field="energyType"
              defaultValue={watch('energyType')}
              {...register("energyType",{required: true})}
              sx={{ width: "auto" }}
            >
              {EnergyTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </ValidateField> 
            <ValidateField<FieldFoodInput>
              field="energy"
              errors={errors}
              suffix="kcal/100g"
              validateNumber
              sx={{ maxWidth: "24ch" }}
              {...register("energy", { required: `請輸入熱量`, ...numberPattern })}
            />
          </HorizontalFieldBox>
          <ValidateField<FieldFoodInput>
            className="w-24"
            label="水份"
            field="water"
            errors={errors}
            suffix="%"
            validateNumber
            hidden={isDry(watch("type"))}
            {...register("water", { required: true, ...numberPattern })}
          />
        </HorizontalFieldBox>

        <HorizontalFieldBox>
          <ValidateField<FieldFoodInput>
            label="蛋白質"
            field="protein"
            suffix="%"
            errors={errors}
            validateNumber
            {...register("protein", { required: true, ...numberPattern })}
          />
          <ValidateField<FieldFoodInput>
            label="脂肪"
            suffix="%"
            field="fat"
            errors={errors}
            validateNumber
            {...register("fat", { required: true, ...numberPattern })}
          />
          <ValidateField<FieldFoodInput>
            label="纖維"
            suffix="%"
            field="fiber"
            errors={errors}
            validateNumber
            {...register("fiber", { required: true, ...numberPattern })}
          />
          <ValidateField<FieldFoodInput>
            label="灰分"
            suffix="%"
            field="ash"
            errors={errors}
            validateNumber
            {...register("ash", { required: true, ...numberPattern })}
          />
        </HorizontalFieldBox>
        <HorizontalFieldBox>
          <ValidateField<FieldFoodInput>
            className="w-24"
            label="鈣"
            suffix="%"
            field="calcium"
            errors={errors}
            validateNumber
            {...register("calcium", numberPattern)}
          />
          <HorizontalFieldBox merged sx={{ my: 0 }}>
            <ValidateField<FieldFoodInput>
              label="磷"
              field="phosphorus"
              errors={errors}
              validateNumber
              sx={{ width: "10ch" }}
              {...register("phosphorus", numberPattern)}
            />
            <ValidateField<FieldFoodInput>
              select
              field="phosUnit"
              defaultValue={phosUnitOptions[0].value}
              {...register("phosUnit",{required: true})}
              sx={{ width: "auto" }}
            >
              {phosUnitOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </ValidateField>   
          </HorizontalFieldBox>
        </HorizontalFieldBox>
        <Button type="submit" sx={{ mx: 1 }} variant="contained" size="large">
          {submitText}
        </Button>
      </StyleForm>
      <Loading loading={loading}/>
    </SwipeableDrawer>
  )
}

export default FoodForm