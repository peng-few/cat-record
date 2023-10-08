import { NextResponse } from "next/server";
import { AnyObject } from ".";

export interface Response<T extends any = undefined>{
  success: boolean,
  msg?: unknown,
  data?: T,
  status?: number,
}

export interface SuccessResponse<T> extends Response<T>{
  success: true,
} 

export interface ErrorResponse extends Response<unknown>{
  success: false,
  msg: unknown,
}

export type JsonResponse = NextResponse<Response>

export const successResponse = <T>(data: Partial<Response<T>> = {}) => {
  const response: SuccessResponse<T> = { ...data, success: true }
  return NextResponse.json(response)
} 

export const errorResponse = ({ msg = '讀取失敗',status = 500, ...data }: Partial<Response>) => {
  const response: ErrorResponse = { ...data, msg, success: false }
  return NextResponse.json(response, { status })
} 