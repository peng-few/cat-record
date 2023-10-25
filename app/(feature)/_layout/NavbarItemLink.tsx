"use client"
import { alpha, styled } from "@mui/material/styles"
import ListItemButton from "@mui/material/ListItemButton"
import Link, { LinkProps } from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React, { ReactNode, useState } from "react"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import Collapse from "@mui/material/Collapse"

const FAKE_DOMAIN = 'http://localhost'
const StyleListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '100px',
  justifyContent: 'center',
  "&.active": {
    background: alpha(theme.palette.primary.light, 0.2),
    color: theme.palette.primary.main,
    ".MuiListItemText-primary,.MuiListItemIcon-root": {
      color: theme.palette.primary.dark,
    },
  },
}))

export type NavbarItemLinkProps = Omit<LinkProps, "href"> &
  React.ComponentProps<"a"> & {
    sub?: ReactNode
  }


export const NavbarItemLink = ({
  href,
  children,
  sub,
}: NavbarItemLinkProps) => {
  const currentPathname = usePathname()
  const currentSearchParams = useSearchParams()
  const url = new URL(FAKE_DOMAIN + href);
  const isActive = currentPathname === url.pathname
    && currentSearchParams.toString() === url.searchParams.toString()
  const [open, setOpen] = useState(false)
  const subOpen = open && !!sub
  const toggleSub = () => setOpen((prev) => !prev)

  return (
    <>
      <StyleListItemButton
        className={`flex-grow flex ${isActive ? 'active' : ''}`}
        onClick={toggleSub}
        sx={{p: 0}}
      >
        {href ? (
          <Link href={href} className='flex-grow flex py-2 px-3'>
            {children}
          </Link>
        ) : (
          <>{children}</>
        )}
        {sub && (open ? <ExpandLess className="sub-icon mr-1"/> : <ExpandMore className="sub-icon mr-1"/>)}
      </StyleListItemButton>
      {sub && (
        <Collapse in={subOpen} timeout="auto">
          {sub}
        </Collapse>
      )}
    </>
  )
}

export default NavbarItemLink
