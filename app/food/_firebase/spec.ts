import { FoodType } from "../../_data/FoodTypes";
import { z } from "zod";
import { zToNumber } from '@/_lib/zUtil'
import { CollectionHandler } from "@/_firebase";

export const COLLECTION_NAME = 'food'
export const collection = new CollectionHandler<FieldFood>(COLLECTION_NAME)

export const FieldFood = z.object({
  id: z.number(),
  type: FoodType,
  energy: zToNumber,
  brand: zToNumber,
  name: z.string(),
  protein: zToNumber,
  fat: zToNumber,
  fiber: zToNumber,
  ash: zToNumber,
  carbonhydrate: zToNumber,
  water: zToNumber.optional(),
  phosphorus: zToNumber.optional(),
  calcium: zToNumber.optional(),
})

export type FieldFood = z.infer<typeof FieldFood>; 
