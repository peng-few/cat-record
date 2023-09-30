import { errorResponse, successResponse } from "@/_lib"
import { deleteDoc, updateDoc } from "firebase/firestore"
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
    const doc = await Collection.getDocById(Number(id))
    await deleteDoc(doc.ref)
    revalidateTag('foods')
    return successResponse()
  } catch (msg) {
    return errorResponse({msg})
  }
}

export async function PUT(req: Request, { params: { id:stringId } }: Params) { 
  try {
    const id = Number(stringId)
    const json = await req.json()
    const parsedData = PostData.parse(json)
    const data = formatPostData({ ...parsedData,id })
    const doc = await Collection.getDocById(id)
    await updateDoc(doc.ref, data)
    revalidateTag('foods')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}