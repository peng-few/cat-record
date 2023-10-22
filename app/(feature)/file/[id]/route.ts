import { Collection } from "../_db/Collection"
import { NextResponse } from "next/server"

export interface Params {
  params: {
    id: string
  }
}
export async function GET(request: Request,{ params: {id} }: Params) {
  const data = await Collection.getData(id)
  if (!data) {
    return NextResponse.json({},{status: 404})
  }
  
  return new Response(data.file.buffer, {
    headers: {
      'Content-Type': data.type,
      'Content-Length': data.size.toString(),
      'Last-Modified': data.uploadDate.toUTCString(),
      'Accept-Ranges': 'bytes',
    },
  
  });
}