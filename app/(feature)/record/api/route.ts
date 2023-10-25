import { Collection } from "../_db/Collection";
import { errorResponse, successResponse } from "@/_lib";
import { formatFormRequest } from "./recordFormatter";
import { revalidateTag } from "next/cache";
import { RecordFormRequestSchema } from "../_db/schema/RecordFormRequestSchema";
import { getUserSession } from "@/auth/_lib/getUserSession";

export async function POST(req: Request) {
  try {
    const session = await getUserSession()
    if (!session?.user) {
      return errorResponse({status: 401})
    }
    const json = await req.json()
    const parseDataWithUser = {
      ...RecordFormRequestSchema.parse(json),
      user: session.user._id
    }
    const data = await formatFormRequest(parseDataWithUser);
    await Collection.addData(data)
    
    revalidateTag('records')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}