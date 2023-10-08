
import { Collection } from '../_db/Collection';
import { errorResponse, successResponse } from '@/_lib';
import { formatFormRequest } from "./foodFormatter";
import { revalidateTag } from "next/cache";
import { FoodFormRequestSchema } from '../_consts/FoodFormRequestSchema';

export async function POST(req: Request) { 
  try {
    const json = await req.json()
    const parsedData = FoodFormRequestSchema.parse(json)
    const data = formatFormRequest(parsedData)
    await Collection.addData(data)
    revalidateTag('foods')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}
