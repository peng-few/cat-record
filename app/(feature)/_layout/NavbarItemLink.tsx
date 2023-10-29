"use client"
import { alpha, styled } from "@mui/material/styles"
import ListItemButton from "@mui/material/ListItemButton"
import Link, { LinkProps } from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React, { MouseEvent, ReactNode, useState } from "react"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import Collapse from "@mui/material/Collapse"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const toLink = (e:MouseEvent) => {
    e.preventDefault()
    if (!href) return;
    router.push(href)
  }

  return (
    <>
      <StyleListItemButton
        className={`flex-grow flex ${isActive ? 'active' : ''}`}
        onClick={toggleSub}
        sx={{p: 0}}
      >
        {href ? (
          <a href={href} onClick={toLink} className='flex-grow flex py-2 px-3'>
            {children}
          </a>
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
