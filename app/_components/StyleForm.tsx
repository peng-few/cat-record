import Box, { BoxProps } from "@mui/material/Box"
import { forwardRef } from "react"

const cssForm = {
  width: '600px',
  "&>div": {
    display: "flex",
    mb: 3,
    "&:not(.label-name+div):not(.label-name)": {
      my: 3,
    },
  },
  '.MuiFormControl-root': {
    mx: 1,
  },
  ".label-name": {
    mt: 3,
    mb: 1,
  },
}
export const StyleForm = forwardRef(function StyleForm({ className,children,sx, ...props }: BoxProps<'form'>,ref) {

  return (
    <Box
      component="form"
      ref={ref}
      noValidate
      
      sx={{...cssForm,...sx}}
      className={`p-12 ${className}`}
      {...props}
    >
      {children}
    </Box>
  )
})

export default StyleForm