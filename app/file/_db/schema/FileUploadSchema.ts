import { zSingleFile } from "@/_lib";
import { z } from "zod";

export const FileUploadSchema = z.object({
  file: zSingleFile()
})

export type FileUpload = z.infer<typeof FileUploadSchema>; 