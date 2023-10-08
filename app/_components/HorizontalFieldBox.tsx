import Box, { BoxProps } from "@mui/material/Box"

const cssHorizontal = {
  "& .MuiFormControl-root": {
    my: 0,
  },
}

const cssMerged = {
  mx: 1,
  "& .MuiFormControl-root": {
    m: 0,
  },
}

export interface HorizontalFieldBoxProps extends BoxProps{
  merged?: boolean
}

export const HorizontalFieldBox = ({
  sx,
  className='',
  children,
  merged= false,
  ...props
}: HorizontalFieldBoxProps) => {

  return (
    <Box
      sx={{
        ...cssHorizontal,
        ...(merged ? cssMerged: {}),
        ...sx
      }}
      className={"flex flex-row my-6 " + className}
      {...props}
    >
      {children}
    </Box>
  )
}

export default HorizontalFieldBox