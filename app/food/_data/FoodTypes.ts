import { z } from "zod"
import { ObjectValues } from "@/_lib"

export const FoodType = z.enum(['Compelete','Complementary', 'Dry'])
export type FoodType = z.infer<typeof FoodType>;

export const FoodTypeName = {
  [FoodType.enum.Compelete]: '主食罐',
  [FoodType.enum.Complementary]: '副食罐',
  [FoodType.enum.Dry]: '乾食',
} as const satisfies Record<FoodType, string>

export type FoodTypeName = ObjectValues<typeof FoodTypeName>

export const isWet = (value: string) =>
  value === FoodType.enum.Compelete ||
  value === FoodType.enum.Complementary

export const isDry = (value: string) => value ===  FoodType.enum.Dry