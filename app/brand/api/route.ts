import { errorResponse, successResponse } from '@/_lib';
import { BrandSchema } from "../_consts/BrandSchema";
import { getBrands } from "../_db/getBrands";
import { Collection } from '../_db/Collection';

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
    const json = await req.json()
    const postData = BrandSchema.parse(json)
    await Collection.addData(postData)
    return successResponse()
  } catch (msg) {
    return errorResponse({msg})
  }
}