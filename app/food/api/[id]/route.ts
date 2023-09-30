import { errorResponse, successResponse } from "@/_lib"
import { Collection } from '../../_firebase'
import { formatPostData } from "../foodFormatter"
import { PostData } from "../route"
import { revalidateTag } from "next/cache"

export interface Params {
  params: {
    id: string
  }
}

export async function DELETE(req: Request, { params: { id } }: Params) { 
  try {
    await Collection.deleteData(id)
    revalidateTag('foods')
    return successResponse()
  } catch (msg) {
    return errorResponse({msg})
  }
}

export async function PUT(req: Request, { params: { id } }: Params) { 
  try {
    const json = await req.json()
    const parsedData = PostData.parse(json)
    const data = formatPostData(parsedData)
    await Collection.updateData(id,data)
    revalidateTag('foods')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}