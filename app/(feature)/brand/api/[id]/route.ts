import { errorResponse, successResponse } from "@/_lib"
import { Collection } from '../../_db/Collection'
import { revalidateTag } from "next/cache"
import { getUserSession } from '@/auth/_lib/getUserSession';
import { isAdmin } from '@/auth/_db/schema/UserSchema';
import { BrandSchema } from "../../_db/schema/BrandSchema"

export interface Params {
  params: {
    id: string
  }
}

export async function PUT(req: Request, { params: { id } }: Params) { 
  try {
    const session = await getUserSession()
    if (!isAdmin(session?.user.role)) {
      return errorResponse({status: 401})
    }
    const data = await req.json()
    const parsedData = BrandSchema.parse(data)

    await Collection.updateData(id,parsedData)
    revalidateTag('brands')
    return successResponse({data})
  } catch (msg) {
    console.log(msg)
    return errorResponse({msg})
  }
}