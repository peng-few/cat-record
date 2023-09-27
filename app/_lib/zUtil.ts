import { z } from "zod"

export const zToNumber = (message = "請輸入數字??") =>
  z.number()
    .or(z.string().min(1, { message }))
    .pipe(z.coerce.number({ invalid_type_error: "請輸入數字" }))

export const zToNumberOptional = () => z.number()
  .or(z.string())
  .pipe(z.coerce.number({ invalid_type_error: "請輸入數字" }))

export const zIsNumber = (msg='請輸入數字') => z.number({ invalid_type_error: msg })

export const zIsPositiveNumber = () => z
  .number({ invalid_type_error: "請輸入數字" })
  .nonnegative({ message: "請輸入正確數字" })
