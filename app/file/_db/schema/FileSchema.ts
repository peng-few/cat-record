import { type Binary } from "mongodb";
import { z } from "zod";

export const FileSchema = z.object({
  filename: z.string(),
  type: z.string(),
  uploadDate: z.date(),
  size: z.number(),
  file: z.custom<Binary>(),
})

export type File = z.infer<typeof FileSchema>; 