import { errorResponse, successResponse } from "@/_lib"
import { deleteDoc, updateDoc } from "firebase/firestore"
import { COLLECTION_NAME, FieldFood } from '../../_firebase'
import { CollectionHandler } from "@/_firebase"

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

export async function PUT(req: Request, { params: { id } }: Params) { 
  try {
    const json = await req.json()
    const putData = FieldFood.parse({ ...json, id: Number(id) })
    const doc = await collection.getDocById(Number(id))
    await updateDoc(doc.ref,putData)
    return successResponse()
  } catch (msg) {
    return errorResponse({msg})
  }
}