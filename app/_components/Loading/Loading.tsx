import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

export interface LoadingProps {
  bg?: string;
  color?: CircularProgressProps['color']
  loading?: boolean,
}

export const Loading = ({
  bg = 'white',
  color = 'primary',
  loading = true,
}:LoadingProps) => {
  
  return (
    <Fade in={loading} unmountOnExit>
      <div className="flex justify-stretch items-stretch absolute inset-0 left-0 top-0 z-10">
        <div className="opacity-70 absolute w-full h-full" style={{ background: bg }} />
        <CircularProgress
          color={color}
          className="absolute"
          sx={{top: '44%', left: '44%'}}
        />
      </div>
    </Fade>
  )
}

export default Loading