import { z } from "zod";
import { RegionType } from "../../_consts/RegionType";

export const BrandSchema = z.object({
  name: z.string(),
  region: RegionType,
  remark: z.string().optional()
})
export type Brand = z.infer<typeof BrandSchema>; 