import { z } from "zod";
import { Collection, FieldRecord } from "../_firebase";
import { errorResponse, successResponse } from "@/_lib";
import { formatPostData, getGroupId } from "./recordFormatter";
import { revalidateTag } from "next/cache";

export const PostData = FieldRecord
  .omit({ id: true, energy: true, totalWater: true })
  .refine(data => typeof data.foodId !== 'undefined', {
    message: "請輸入完整的品名+餵食量",
    path: ["foodId"],
  })
  .refine(data => (data.foodId && data.amount) || data.water, {
    message: "須至少餵食或加水量",
    path: ["amount"],
  })

export type PostData = z.infer<typeof PostData>;

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const postData = PostData.parse(json)
    const data = await formatPostData(postData);
    const groupId = getGroupId(data.date)
    console.log(data)
    await Collection.addData(groupId,data)
    Collection.setGroupId(groupId)
    
    revalidateTag('records')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}