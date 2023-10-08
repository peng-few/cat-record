'use client'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import React,{ useState } from "react";
import ConfirmDialog from "@/_components/ConfirmDialog";
import { simpleFetch } from "@/_lib";
import { useRouter } from "next/navigation"
import { StatusSnackbar,useSnackbar } from "@/_components/StatusSnackbar";
import { FoodEntity } from "./_consts/FoodEntitySchema";
import FoodEdit from "./FoodEdit";
import { type WithId } from 'mongodb';

export interface FoodTableActionProps{
  food: WithId<FoodEntity>,
}

export const FoodTableAction = ({ food }:FoodTableActionProps) => {
  const [actionStatus, setActionStatus] = useState<
    | 'NONE'
    | HTMLElement
    | 'EDIT'
    | 'DELETE_CONFIRM'
    | 'SENDING'>('NONE');

  const menuVisible = typeof actionStatus !== 'string';
  const anchorEl = menuVisible ? actionStatus : null;
  const { snackbarRef, snackbar } = useSnackbar()
  const router = useRouter()

  const openEditForm = () => {
    setActionStatus('EDIT');
  }

  const openMenu = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionStatus(event.currentTarget);
  };

  const closeAll = () => {
    setActionStatus('NONE');
  };

  const confirmDelete = () => {
    setActionStatus('DELETE_CONFIRM')
  }

  const deleteFood = async () => {
    setActionStatus('SENDING')
    const { success } = await simpleFetch.delete(`food/api/${food._id}`)
    if (success) {
      router.refresh()
      snackbar?.success({msg: '刪除成功'})
    } else {
      snackbar?.error({msg: '刪除失敗'})
    }
    setActionStatus('NONE')
  }

  return (
    <>
      <IconButton color="inherit" onClick={openMenu}>
        <MoreVertOutlinedIcon/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={menuVisible}
        onClose={closeAll}
      >
        <MenuItem onClick={openEditForm}>
          <ModeEditOutlineOutlinedIcon color="action" className="mr-2"/> 編輯
        </MenuItem>
        <MenuItem onClick={confirmDelete}>
          <DeleteForeverOutlinedIcon color="action" className="mr-2"/> 刪除
        </MenuItem>
      </Menu>
      <FoodEdit food={food} onClose={closeAll} open={actionStatus === 'EDIT'}/>
      <ConfirmDialog
        open={actionStatus === 'DELETE_CONFIRM' || actionStatus === 'SENDING'}
        onCancel={closeAll}
        onOk={deleteFood}
        loading={actionStatus === 'SENDING'}
      >
        確認要刪除此項?
      </ConfirmDialog>
      <StatusSnackbar ref={snackbarRef}/>
    </>
  )
}

export default FoodTableAction