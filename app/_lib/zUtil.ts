import { MongoId } from "@/_types"
import { MAX_FILE_SIZE, isValidImage, isValidFile } from "@/file/_lib/fileValidation"
import { z } from "zod"

export const zToNumber = (message = "請輸入數字??") =>
  z.number()
    .or(z.string().min(1, { message }))
    .pipe(z.coerce.number({ invalid_type_error: "請輸入數字" }))

export const zToNumberOptional = () => z.number()
  .or(z.string().transform((val,ctx) => {
    if (!val) return undefined
    if (isNaN(Number(val))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a number",
      });
      return z.NEVER;
    }
    return Number(val)
  })).optional()

export const zToDate = () => z.date().or(z.string()).pipe(z.coerce.date({invalid_type_error: '請輸入正確時間'})) 

export const zIsNumber = (msg='請輸入數字') => z.number({ invalid_type_error: msg })

export const zIsPositiveNumber = () => z
  .number({ invalid_type_error: "請輸入數字" })
  .nonnegative({ message: "請輸入正確數字" })

export const zFile = () => z.custom<File>(
  (file) => Object.prototype.toString.call(file) === '[object File]')
  .refine((file) => isValidFile(file))
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 16MB.`)

export const zFiles = () => zFile().array()
  .or(z.custom<FileList>(
  (files) => Object.prototype.toString.call(files) === '[object FileList]')
  .transform(files => [...files]))
  .or(zFile())

  export const zSingleFile = () => zFiles().transform(file => {
    if (file instanceof Array) {
      return file[0]
    }
    return file
  })

export const zImage = () => zFile()
  .refine((file) => isValidImage(file)
)

export const zImages = () => zImage().array()
  .or(z.custom<FileList>(
    (files) => Object.prototype.toString.call(files) === '[object FileList]')
    .transform(files => [...files]))
  .or(zImage())

export const zSingleImage = () => zImages().transform(file => {
  if (file instanceof Array) {
    return file[0]
  }
  return file
})

export const zMongoId = z.custom<MongoId>();