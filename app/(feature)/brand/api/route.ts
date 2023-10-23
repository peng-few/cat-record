import { errorResponse, successResponse } from '@/_lib';
import { BrandSchema } from "../_db/schema/BrandSchema";
import { getBrands } from "../_db/getBrands";
import { Collection } from '../_db/Collection';
import { getUserSession } from '@/auth/_lib/getUserSession';
import { isAdmin } from '@/auth/_db/schema/UserSchema';

export async function GET() {
  try {
    const data = await getBrands()
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}

export async function POST(req:Request) {
  try {
    const session = await getUserSession()
    if (!isAdmin(session?.user.role)) {
      return errorResponse({status: 401})
    }
    const json = await req.json()
    const postData = BrandSchema.parse(json)
    await Collection.addData(postData)
    return successResponse()
  } catch (msg) {
    return errorResponse({msg})
  }
}