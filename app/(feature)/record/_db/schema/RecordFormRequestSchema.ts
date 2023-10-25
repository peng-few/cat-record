import z from "zod";
import { RecordSchema } from "./RecordSchema";

export const RecordFormRequestSchema = RecordSchema
  .omit({ energy: true, totalWater: true,user: true })
  .refine(data => typeof data.foodId !== 'undefined', {
    message: "請輸入完整的品名+餵食量",
    path: ["foodId"],
  })
  .refine(data => (data.foodId && data.amount) || data.water, {
    message: "須至少餵食或加水量",
    path: ["amount"],
  })

export type RecordFormRequest = z.infer<typeof RecordFormRequestSchema>;