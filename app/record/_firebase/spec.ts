import { z } from "zod";
import { zIsNumber, zToNumberOptional,zToDate } from '@/_lib/zUtil'
import { RecordStatus } from "../_data/RecordStatus";
import { SubCollectionHander } from "@/_firebase/SubCollectionHandler";

export const COLLECTION_NAME = 'daily_record'
export const SUBCOLLECTION_NAME = 'record'
export const Collection = new SubCollectionHander(COLLECTION_NAME, SUBCOLLECTION_NAME)

export const FieldRecord = z.object({
  id: z.string(),
  date: zToDate(),
  foodId: z.string().optional(),
  amount: zToNumberOptional(),
  water: zToNumberOptional(),
  status: RecordStatus,
  energy: zIsNumber(),
  totalWater: zIsNumber(),
})

export type FieldRecord = z.infer<typeof FieldRecord>; 
