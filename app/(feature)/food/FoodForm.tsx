"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { FoodType, FoodTypeName, isDry } from "./_consts/FoodType"
import { EnergyTypeName } from "./_consts/EnergyType"
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
import { PhosUnitType } from './_consts/PhosUnitType'
import { FoodFormRequestSchema,FoodFormRequest } from "./_db/schema/FoodFormRequestSchema"
import { noop, objToSelectOptions, unitConverter } from "@/_lib"
import { ValidateField, StyleForm, HorizontalFieldBox, Loading } from "@/_components"
import { getUnitOptions } from "@/_consts/UnitType"
import { useBrands } from "@/(feature)/brand/_components/BrandsContext"
import { zodResolver } from "@hookform/resolvers/zod"

export interface FoodFormProps {
  values?: Partial<FoodFormRequest>,
  onSubmit: SubmitHandler<FoodFormRequest>,
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
  const phosUnitOptions = useMemo(() => getUnitOptions(PhosUnitType.Values), [])
  const energyTypeOptions = useMemo(() => objToSelectOptions(EnergyTypeName), [])
  const foodTypeOptions = useMemo(()=> objToSelectOptions(FoodTypeName), [])
  const brands = useBrands()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FoodFormRequest>({
    resolver: zodResolver(FoodFormRequestSchema)
  })

  useEffect(() => {
    const defaultValues:Partial<FoodFormRequest> = {
      energyType: energyTypeOptions[0].value,
      type: FoodType.enum.Compelete,
      brand: '',
      ...values,
      calcium: values?.calcium && unitConverter.mgToPercentage(values?.calcium, values?.energy),
      phosphorus:  values?.phosphorus && unitConverter.mgToPercentage(values?.phosphorus, values?.energy)
    };
    reset(defaultValues)
  }, [reset, values, energyTypeOptions])

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
            {foodTypeOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                checked={watch('type') === option.value}
                control={<Radio />}
                label={option.label}
                {...register("type")}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{errors.type?.message}</FormHelperText>
        </FormControl>
        <HorizontalFieldBox>
          <ValidateField<FoodFormRequest>
            select
            className="flex-grow"
            label="品牌"
            field="brand"
            value={watch('brand')}
            errors={errors}
            {...register("brand")}
          >
            {brands?.map((brand) => (
              <MenuItem key={brand._id} value={brand._id}>
                {brand.name}
              </MenuItem>
            ))}
          </ValidateField>
          <ValidateField<FoodFormRequest>
            label="品名"
            className="flex-grow"
            field="name"
            errors={errors}
            {...register("name", { required: true })}
          />
        </HorizontalFieldBox>
        <HorizontalFieldBox>
          <HorizontalFieldBox merged sx={{ my: 0 }}>
            <ValidateField<FoodFormRequest>
              select
              field="energyType"
              value={watch('energyType')}
              {...register("energyType")}
              sx={{ width: "auto" }}
            >
              {energyTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </ValidateField> 
            <ValidateField<FoodFormRequest>
              field="energy"
              errors={errors}
              suffix="kcal/100g"
              sx={{ maxWidth: "24ch" }}
              {...register("energy")}
            />
          </HorizontalFieldBox>
          <ValidateField<FoodFormRequest>
            className="w-24"
            label="水份"
            field="water"
            errors={errors}
            suffix="%"
            hidden={isDry(watch("type"))}
            {...register("water")}
          />
        </HorizontalFieldBox>

        <HorizontalFieldBox>
          <ValidateField<FoodFormRequest>
            label="蛋白質"
            field="protein"
            suffix="%"
            errors={errors}
            {...register("protein")}
          />
          <ValidateField<FoodFormRequest>
            label="脂肪"
            suffix="%"
            field="fat"
            errors={errors}
            {...register("fat")}
          />
          <ValidateField<FoodFormRequest>
            label="纖維"
            suffix="%"
            field="fiber"
            errors={errors}
            {...register("fiber")}
          />
          <ValidateField<FoodFormRequest>
            label="灰分"
            suffix="%"
            field="ash"
            errors={errors}
            {...register("ash")}
          />
        </HorizontalFieldBox>
        <HorizontalFieldBox>
          <ValidateField<FoodFormRequest>
            className="w-24"
            label="鈣"
            suffix="%"
            field="calcium"
            errors={errors}
            {...register("calcium")}
          />
          <HorizontalFieldBox merged sx={{ my: 0 }}>
            <ValidateField<FoodFormRequest>
              label="磷"
              field="phosphorus"
              errors={errors}
              sx={{ width: "10ch" }}
              {...register("phosphorus")}
            />
            <ValidateField<FoodFormRequest>
              select
              field="phosUnit"
              value={PhosUnitType.Enum.Percentage}
              {...register("phosUnit")}
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
        <input type="file" {...register('img')}/>
        <Button type="submit" sx={{ mx: 1 }} variant="contained" size="large">
          {submitText}
        </Button>
      </StyleForm>
      <Loading loading={loading}/>
    </SwipeableDrawer>
  )
}

export default FoodForm