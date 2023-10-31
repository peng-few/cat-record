'use client'
import Chip, { ChipProps } from "@mui/material/Chip"
import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import { useRouter } from "next/navigation"

export interface ChipLinkProps extends ChipProps{
  selected: boolean,
  href: Url,
}
export const ChipLink = ({
  selected, href,variant="outlined",...props
}: ChipLinkProps) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <Chip
        {...props}
        variant={variant}
        color={selected ? 'primary' : 'default'}  
      />
    </Link>
  )
}

export default ChipLink