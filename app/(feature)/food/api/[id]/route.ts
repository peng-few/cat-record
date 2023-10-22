import { errorResponse, successResponse } from "@/_lib"
import { Collection } from '../../_db/Collection'
import { formatFormRequest } from "../foodFormatter"
import { FoodFormRequestSchema } from "@/(feature)/food/_db/schema/FoodFormRequestSchema"
import { revalidateTag } from "next/cache"
import getFood from "@/(feature)/food/_db/getFood"
import { deleteFile } from "@/(feature)/file/_db/deleteFile"
import { getUserSession } from '@/auth/_lib/getUserSession';
import { isAdmin } from '@/auth/_db/schema/UserSchema';

export interface Params {
  params: {
    id: string
  }
}

export async function DELETE(req: Request, { params: { id } }: Params) { 
  try {
    const session = await getUserSession()
    if (!isAdmin(session?.user.role)) {
      return errorResponse({status: 401})
    }
    const deleteImg = async (id:string) => {
      const food = await getFood(id)
      return deleteFile(food?.imgId)
    }

    await Promise.all([deleteImg(id),Collection.deleteData(id)])
    revalidateTag('foods')
    return successResponse()
  } catch (msg) {
    return errorResponse({msg})
  }
}

export async function PUT(req: Request, { params: { id } }: Params) { 
  try {
    const session = await getUserSession()
    if (!isAdmin(session?.user.role)) {
      return errorResponse({status: 401})
    }
    const formData = await req.formData()
    const parsedData = FoodFormRequestSchema.parse(Object.fromEntries(formData.entries()))
    const data = await formatFormRequest(parsedData)
    await Collection.updateData(id,data)
    revalidateTag('foods')
    return successResponse({data})
  } catch (msg) {
    console.log(msg)
    return errorResponse({msg})
  }
}