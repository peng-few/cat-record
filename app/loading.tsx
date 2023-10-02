import LinearProgress from "@mui/material/LinearProgress";

export default function Loading() {
  return (
    <LinearProgress sx={{
      zIndex: 9999,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
    }}/>
  )
}