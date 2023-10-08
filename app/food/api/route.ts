import { CollectionHandler } from "@/_firebase";
import { FieldFood,COLLECTION_NAME } from '../_firebase';
import { errorResponse, successResponse } from '@/_lib';
import formatPostData from "./formatPostData";
import { z } from "zod";
import UnitType from "@/_data/UnitType";
import { EnergyType } from "@/_data/EnergyTypes";

const collection = new CollectionHandler<FieldFood>(COLLECTION_NAME)

export const PhosUnitType = z.enum([
  UnitType.enum.MgPerKalorie,
  UnitType.enum.Percentage
])
export type PhosUnitType = z.infer<typeof PhosUnitType>;


export const PostData = FieldFood
  .omit({ carbonhydrate: true, id: true })
  .extend({
    phosUnit: PhosUnitType.optional(),
    energyType: EnergyType.optional(),
  })
export type PostData = z.infer<typeof PostData>;

export async function POST(req: Request) { 
  try {
    const json = await req.json()
    const postData = PostData.parse(json)
    const data = await formatPostData(postData)
    await collection.addData(data)
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}
