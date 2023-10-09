import { z } from "zod"
import { ObjectValues } from "@/_types/types"

export const RecordStatus = z.enum(['Finish', 'Draft'])

export type RecordStatus = z.infer<typeof RecordStatus>;

export const RecordStatusName = {
  [RecordStatus.enum.Draft]: '待進食',
  [RecordStatus.enum.Finish]: '完成',
} as const satisfies Record<RecordStatus, string>

export type RecordStatusName = ObjectValues<typeof RecordStatusName>

export const isFinish = (value: string) => value ===  RecordStatus.enum.Finish

export const isDraft = (value: string) => value ===  RecordStatus.enum.Draft