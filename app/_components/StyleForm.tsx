import Box, { BoxProps } from "@mui/material/Box"
import { forwardRef } from "react"

const cssForm = {
  width: '600px',
  "& .MuiFormControl-root": {
    mx: 1,
    my: 3,
    minWidth: "65px",
    display: "flex",
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