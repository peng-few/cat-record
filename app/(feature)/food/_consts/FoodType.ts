import { z } from "zod"
import { getObjValueFromKey } from "@/_lib"
import { ObjectValues } from "@/_types";

export const FoodType = z.enum(['Compelete','Complementary', 'Dry'])
export type FoodType = z.infer<typeof FoodType>;

export const FoodTypeName = {
  [FoodType.enum.Compelete]: '主食罐',
  [FoodType.enum.Complementary]: '副食罐',
  [FoodType.enum.Dry]: '乾飼料',
} as const satisfies Record<FoodType, string>

export type FoodTypeName = ObjectValues<typeof FoodTypeName>

export const isWet = (value: string) =>
  value === FoodType.enum.Compelete ||
  value === FoodType.enum.Complementary

export const isDry = (value: string) => value === FoodType.enum.Dry

export const foodTypeToName = getObjValueFromKey(FoodTypeName)