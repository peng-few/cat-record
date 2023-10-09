import { Collection,RecordDateCollection } from "../_db/Collection";
import { errorResponse, successResponse } from "@/_lib";
import { formatFormRequest, getRecordDate } from "./recordFormatter";
import { revalidateTag } from "next/cache";
import { RecordFormRequestSchema } from "../_consts/RecordFormRequestSchema";

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const postData = RecordFormRequestSchema.parse(json)
    const data = await formatFormRequest(postData);
    const recordDate = getRecordDate(data.date)
    await Collection.addData(data)
    RecordDateCollection.upsertData({date: recordDate})
    
    revalidateTag('records')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}