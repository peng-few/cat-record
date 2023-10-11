import z from "zod";
import { zIsNumber, zToNumberOptional,zToDate } from '@/_lib/zUtil'
import { RecordStatus } from "./RecordStatus";

export const RecordSchema = z.object({
  date: zToDate(),
  foodId: z.string().optional(),
  amount: zToNumberOptional(),
  water: zToNumberOptional(),
  status: RecordStatus,
  energy: zIsNumber(),
  totalWater: zIsNumber(),
})

export type Record = z.infer<typeof RecordSchema>; 