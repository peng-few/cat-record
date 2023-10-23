import { z } from "zod";
import { ObjectValues } from "@/_types/types";

export const RegionType = z.enum([
  'America', 'Germany','Europe','Taiwan', 'Japan', 'Australia'
]);
export type RegionType = z.infer<typeof RegionType>;

export const RegionTypeName = {
  [RegionType.enum.America]: '美加',
  [RegionType.enum.Germany]: '德',
  [RegionType.enum.Europe]: '其他歐洲',
  [RegionType.enum.Taiwan]: '台灣',
  [RegionType.enum.Japan]: '日韓',
  [RegionType.enum.Australia]: '紐澳',
} as const satisfies Record<RegionType, string>

export type RegionTypeName = ObjectValues<typeof RegionTypeName>