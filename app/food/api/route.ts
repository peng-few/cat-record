import { CollectionHandler } from "@/_firebase";
import { FieldFood,COLLECTION_NAME } from '../_firebase';
import { WithId, errorResponse, successResponse } from '@/_lib';
import { formatPostData } from "./foodFormatter";
import { z } from "zod";
import UnitType from "@/_data/UnitType";
import { EnergyType } from "../_data/EnergyTypes";
import { applyId } from "@/serialNumber/_firebase";
import { FoodType } from "../_data/FoodTypes";
import { revalidateTag } from "next/cache";

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
  .refine((data) => data.type == FoodType.Enum.Dry || data.water , {
    message: "請輸入水份",
    path: ["water"]
  })

export type PostData = z.infer<typeof PostData>;

export async function POST(req: Request) { 
  try {
    const json = await req.json()
    const parsedData = PostData.parse(json)
    const data = formatPostData(parsedData)
    await collection.addData(data)
    revalidateTag('foods')
    return successResponse({data})
  } catch (msg) {
    return errorResponse({msg})
  }
}
