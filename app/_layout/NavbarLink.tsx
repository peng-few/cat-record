'use client'
import { alpha, styled } from "@mui/material/styles"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation";
import React from "react"

const StyleLink = styled(Link)(({ theme }) => ({
  '&.active': {
    '.MuiListItemButton-root': {
      background: alpha(theme.palette.primary.light, 0.2),
      color: theme.palette.primary.main, 
    },
    '.MuiListItemText-primary,.MuiListItemIcon-root': {
      color: theme.palette.primary.dark
    }
  }
})
)

export const NavbarLink = ({ href,children }: LinkProps & React.ComponentProps<'a'>) => {
  const pathname = usePathname()
  const isActive = pathname === href ? 'active' : ''
  
  return (
    <StyleLink href={href} className={`flex-grow ${isActive}`}>
      {children}
    </StyleLink>
  )
}

export default NavbarLink