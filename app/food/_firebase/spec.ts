import { FoodType } from "../_data/FoodTypes";
import { z } from "zod";
import { zIsNumber, zIsPositiveNumber, zToNumber, zToNumberOptional } from '@/_lib/zUtil'
import { CollectionHandler } from "@/_firebase";

export const COLLECTION_NAME = 'food'
export const collection = new CollectionHandler<FieldFood>(COLLECTION_NAME)

export const FieldFood = z.object({
  id: zIsNumber(),
  type: FoodType,
  energy: zToNumber('請填入熱量').pipe(zIsPositiveNumber()),
  brand: zToNumber('請選擇品牌').pipe(zIsPositiveNumber()),
  name: z.string().min(1,{message: '請填入品名'}),
  protein: zToNumber('請輸入蛋白質').pipe(zIsPositiveNumber()),
  fat: zToNumber('請輸入脂肪').pipe(zIsPositiveNumber()),
  fiber: zToNumber('請輸入纖維').pipe(zIsPositiveNumber()),
  ash: zToNumber('請輸入灰分').pipe(zIsPositiveNumber()),
  carbonhydrate: zToNumber('請輸入碳水化合物').pipe(zIsPositiveNumber()),
  water: zToNumberOptional(),
  phosphorus: zToNumberOptional(),
  calcium: zToNumberOptional(),
});

export type FieldFood = z.infer<typeof FieldFood>; 

