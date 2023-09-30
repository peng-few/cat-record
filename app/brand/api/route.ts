import { errorResponse, successResponse } from '@/_lib';
import { FieldBrand, Collection } from "../_firebase";
import { z } from "zod";
import { getBrands } from "../_firebase/getBrands";

export async function GET() {
  try {
    const data = await getBrands()
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}

export const PostData = FieldBrand.omit({ id: true })
export type PostData = z.infer<typeof PostData>;

export async function POST(req:Request) {
  try {
    const json = await req.json()
    const postData = PostData.parse(json)
    await Collection.addData(postData)
    return successResponse()
  } catch (msg) {
    return errorResponse({msg})
  }
}