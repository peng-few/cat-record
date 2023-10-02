import { errorResponse, successResponse } from "@/_lib"
import { Collection } from '../../../_firebase'
import { formatPostData } from "../../recordFormatter"
import { PostData } from "../../route"
import { revalidateTag } from "next/cache"

export interface Params {
  params: {
    id: string,
    groupId: string
  }
}

export async function DELETE(req: Request, { params: { id,groupId } }: Params) { 
  try {
    await Collection.deleteData(groupId,id)
    revalidateTag('records')
    return successResponse()
  } catch (msg) {
    console.log(msg)
    return errorResponse({msg})
  }
}

export async function PUT(req: Request, { params: { groupId, id } }: Params) { 
  try {
    const json = await req.json()
    const parsedData = PostData.parse(json)
    const data = await formatPostData(parsedData)
    await Collection.updateData(groupId,id,data)
    revalidateTag('records')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}