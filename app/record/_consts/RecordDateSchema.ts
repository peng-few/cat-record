import z from "zod";

export const RecordDateSchema = z.object({
  date: z.string(),
})

export type RecordDate = z.infer<typeof RecordDateSchema>; 
