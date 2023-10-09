import { errorResponse, successResponse } from "@/_lib"
import { Collection } from '../../_db'
import { formatFormRequest } from "../recordFormatter"
import { revalidateTag } from "next/cache"
import { RecordFormRequestSchema } from "@/record/_consts/RecordFormRequestSchema"

export interface Params {
  params: {
    id: string,
  }
}

export async function DELETE(req: Request, { params: { id } }: Params) {
  try {
    await Collection.deleteData(id)
    revalidateTag('records')
    return successResponse()
  } catch (msg) {
    console.log(msg)
    return errorResponse({msg})
  }
}

export async function PUT(req: Request, params: Params) { 
  const { params: { id } } = params;
  try {
    const json = await req.json()
    const parsedData = RecordFormRequestSchema.parse(json)
    const data = await formatFormRequest(parsedData)
    await Collection.updateData(id, data)
    revalidateTag('records')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}