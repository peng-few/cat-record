import { errorResponse, successResponse } from "@/_lib"
import { Collection } from '../../_db/Collection'
import { formatFormRequest } from "../foodFormatter"
import { FoodFormRequestSchema } from "@/food/_consts/FoodFormRequestSchema"
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
    const parsedData = FoodFormRequestSchema.parse(json)
    const data = formatFormRequest(parsedData)
    await Collection.updateData(id,data)
    revalidateTag('foods')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}