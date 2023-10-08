import { AnyObject } from "@/_lib"
import InputAdornment from "@mui/material/InputAdornment"
import TextField, {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField"
import { ForwardedRef, ReactNode, ReactElement, forwardRef } from "react"
import { FieldErrors } from "react-hook-form"

export type ValidateFieldProps<
  Fields extends AnyObject,
  Variant extends TextFieldVariants
> = TextFieldProps<Variant> & {
  field?: keyof Fields
  variant?: Variant
  errors?: FieldErrors<Fields>
  validateNumber?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  hidden?:boolean
}

export interface ValidateField {
  <
    Fields extends AnyObject = {},
    Variant extends TextFieldVariants = TextFieldVariants
  >(
    p: ValidateFieldProps<Fields, Variant> & {
      ref?: ForwardedRef<HTMLDivElement>
    }
  ): ReactElement
}

export const ValidateField = forwardRef(function ValidateField<
  Fields extends AnyObject = {},
  Variant extends TextFieldVariants = TextFieldVariants
>(
  {
    children,
    label,
    field = "",
    errors = {},
    validateNumber = false,
    hidden = false,
    suffix,
    prefix,
    sx,
    InputProps,
    ...props
  }: ValidateFieldProps<Fields, Variant>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const getErrorMessage = (error: FieldErrors<Fields>[keyof Fields]) => {
    if (!error) return ""
    if (error.message) return error.message as string
    if (error.type === "pattern" && validateNumber) return "請輸入數字"
    if (error.type === "required") return `請輸入${label}`
  }

  const endAdornment = suffix ? (
    <InputAdornment position="end">{suffix}</InputAdornment>
  ) : (
    InputProps?.endAdornment
  )

  const startAdornment = prefix ? (
    <InputAdornment position="start">{prefix}</InputAdornment>
  ) : (
    InputProps?.startAdornment
  )

  return (
    <TextField
      {...props}
      ref={ref}
      label={label}
      error={!!errors[field]}
      sx={{ ...sx,display: hidden ? 'none!important' : 'flex' }}
      helperText={getErrorMessage(errors[field])}
      InputProps={{
        ...InputProps,
        endAdornment,
        startAdornment,
      }}
    >
      {children}
    </TextField>
  )
}) as ValidateField

export default ValidateField
