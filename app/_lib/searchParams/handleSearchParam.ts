import { URLSearchParams } from "url";

export interface HandleSearchParam {
  (searchParams: URLSearchParams, ...args: any) : URLSearchParams
}

export const refreshPage:HandleSearchParam = (searchParams: URLSearchParams) => {
  searchParams.set('page', '1')
  return searchParams
}

export const toggleParam:HandleSearchParam = (searchParams: URLSearchParams,[key,value]: string[]) => {
  searchParams.has(key, value)
    ? searchParams.delete(key, value)
    : searchParams.set(key, value)
  return searchParams
}

export const toggleMutipleParam:HandleSearchParam = (searchParams: URLSearchParams,[key,value]: string[]) => {
  searchParams.has(key, value)
    ? searchParams.delete(key, value)
    : searchParams.append(key, value)
  return searchParams
}

export const addParam = (searchParams: URLSearchParams,[key,value]: string[]) => {
  searchParams.append(key, value)
  return searchParams
}

export const deleteParam = (searchParams: URLSearchParams,[key,value]: string[]) => {
  searchParams.delete(key, value)
  return searchParams
}