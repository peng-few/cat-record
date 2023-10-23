"use client"
import { Brand } from "./_db/schema/BrandSchema"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { WithStringId } from "@/_types"
import { useBrandEdit } from "./BrandEditProvider"
import  IconButton  from "@mui/material/IconButton"

export interface BrandEditButtonProps{
  brand: WithStringId<Brand>,
}

export default function BrandEditButton({brand}: BrandEditButtonProps) {
  const { setBrandEdit } = useBrandEdit()
  const openEdit = () => {
    setBrandEdit({
      brand,
      open: true
    })
  }

  return (
    <IconButton
      size="small"
      onClick={openEdit}
      color="primary"
    >
      <ModeEditIcon fontSize="inherit"/>
    </IconButton>
  )
}
