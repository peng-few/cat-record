import z from "zod";
import { zIsNumber, zToNumberOptional,zToDate } from '@/_lib/zUtil'
import { RecordStatus } from "../../_consts/RecordStatus";

export const RecordSchema = z.object({
  date: zToDate(),
  foodId: z.string().optional(),
  amount: zToNumberOptional(),
  water: zToNumberOptional(),
  status: RecordStatus,
  energy: zIsNumber(),
  totalWater: zIsNumber(),
  user: z.string(),
})

export type Record = z.infer<typeof RecordSchema>; 
