import { z } from "zod"
import { ObjectValues, SelectOptions } from "@/_lib"

export const FoodType = z.enum(['Wet', 'Dry'])
export type FoodType = z.infer<typeof FoodType>;

export const FoodTypeName = {
  [FoodType.enum.Wet]: '濕食',
  [FoodType.enum.Dry]: '乾食',
} as const satisfies Record<FoodType, string>

export type FoodTypeName = ObjectValues<typeof FoodTypeName>

export const FoodTypeOptions: SelectOptions<FoodType,FoodTypeName> = [
  { value: FoodType.enum.Wet, label: FoodTypeName[FoodType.enum.Wet] },
  { value: FoodType.enum.Dry, label: FoodTypeName[FoodType.enum.Dry] },
] as const

export const isWet = (value: string) => value ===  FoodType.enum.Wet

export const isDry = (value: string) => value ===  FoodType.enum.Dry