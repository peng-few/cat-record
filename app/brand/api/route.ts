import { applyId } from "@/serialNumber/_firebase";
import { WithId, errorResponse, successResponse } from '@/_lib';
import { FieldBrand, collection } from "../_firebase";
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
    const dataWithId:WithId<PostData> = await applyId('brand',postData)
    await collection.addData(dataWithId)
    return successResponse()
  } catch (msg) {
    return errorResponse({msg})
  }
}