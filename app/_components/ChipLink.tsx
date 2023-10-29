'use client'
import Chip, { ChipProps } from "@mui/material/Chip"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
// import Link from "next/link"

export interface ChipLinkProps extends ChipProps{
  selected: boolean,
  href: string,
}
export const ChipLink = ({
  selected, href,variant="outlined",...props
}: ChipLinkProps) => {
  const router = useRouter()
  const toLink = (e:MouseEvent) => {
    e.preventDefault()
    router.push(href)
  }
  return (
    <a onClick={toLink} className="cursor-pointer">
      <Chip
        {...props}
        variant={variant}
        color={selected ? 'primary' : 'default'}  
      />
    </a>

  )
}

export default ChipLink