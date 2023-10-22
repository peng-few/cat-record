
import { Collection } from '../_db/Collection';
import { errorResponse, successResponse } from '@/_lib';
import { formatFormRequest } from "./foodFormatter";
import { revalidateTag } from "next/cache";
import { FoodFormRequestSchema } from '../_db/schema/FoodFormRequestSchema';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) { 
  try {
    const session = getServerSession()
    const formData = await req.formData()
    const parsedData = FoodFormRequestSchema.parse(Object.fromEntries(formData.entries()))
    const formatData = await formatFormRequest(parsedData)

    await Collection.addData(formatData)
    revalidateTag('foods')
    return successResponse({data: formatData})
  } catch (msg) {
    console.log(msg)
    return errorResponse({msg})
  }
}
