import { errorResponse, successResponse } from "@/_lib"
import { deleteDoc, updateDoc } from "firebase/firestore"
import { COLLECTION_NAME, FieldFood } from '../../_firebase'
import { CollectionHandler } from "@/_firebase"
import { formatPostData } from "../foodFormatter"
import { PostData } from "../route"

const collection = new CollectionHandler<FieldFood>(COLLECTION_NAME)
export interface Params {
  params: {
    id: string
  }
}

export async function DELETE(req: Request, { params: { id } }: Params) { 
  try {
    const doc = await collection.getDocById(Number(id))
    await deleteDoc(doc.ref)
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
    const doc = await collection.getDocById(id)
    await updateDoc(doc.ref,data)
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}