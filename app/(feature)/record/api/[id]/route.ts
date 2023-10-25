import { errorResponse, successResponse } from "@/_lib"
import { Collection } from '../../_db'
import { formatFormRequest } from "../recordFormatter"
import { revalidateTag } from "next/cache"
import { RecordFormRequestSchema } from "../../_db/schema/RecordFormRequestSchema"
import { getUserSession } from "@/auth/_lib/getUserSession"

export interface Params {
  params: {
    id: string,
  }
}

export async function DELETE(req: Request, { params: { id } }: Params) {
  try {
    const session = await getUserSession()
    if (!session?.user) {
      return errorResponse({status: 401})
    }
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
    const session = await getUserSession()
    if (!session?.user) {
      return errorResponse({status: 401})
    }
    const json = await req.json()
    const parseDataWithUser = {
      ...RecordFormRequestSchema.parse(json),
      user: session.user._id
    }
    const data = await formatFormRequest(parseDataWithUser)
    await Collection.updateData(id, data)
    revalidateTag('records')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}