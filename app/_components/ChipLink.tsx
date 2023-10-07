import Chip, { ChipProps } from "@mui/material/Chip"
import Link from "next/link"

export interface ChipLinkProps extends ChipProps{
  selected: boolean,
  href: string,
}
export const ChipLink = ({
  selected, href,variant="outlined",...props
}:ChipLinkProps) => {
  return (
    <Link href={href}>
      <Chip {...props} variant={variant} color={selected? 'primary': 'default'} />
    </Link>
  )
}

export default ChipLink