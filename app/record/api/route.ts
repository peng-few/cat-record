import { Collection } from "../_db/Collection";
import { errorResponse, successResponse } from "@/_lib";
import { formatFormRequest } from "./recordFormatter";
import { revalidateTag } from "next/cache";
import { RecordFormRequestSchema } from "../_db/schema/RecordFormRequestSchema";

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const postData = RecordFormRequestSchema.parse(json)
    const data = await formatFormRequest(postData);
    await Collection.addData(data)
    
    revalidateTag('records')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}