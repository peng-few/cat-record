import { getObjValueFromKey } from "@/_lib";
import { FoodTypeName } from "./FoodType";

export const SearchParam = {
  type: FoodTypeName,
  phosphorus: {
    low: '低磷'
  },
  protein: {
    low: '低蛋白',
    high: '高蛋白'
  },
  carbon: {
    low: '低碳水'
  },
  fishmeat: {
    '0': '非魚肉底'
  },
  brand: true
} as const

export type SearchParam = typeof SearchParam
export type SearchParamType = keyof typeof SearchParam

export const getParamNames = (params: { [key in SearchParamType]?: string | string[] }) => {
  const paramNames:{[key in SearchParamType]?: string} = {}
  for (const param of Object.keys(params) as SearchParamType[]) {
    const value = params[param];
    const getParamNames = SearchParam[param];
  
    if (typeof getParamNames !== 'object' || !value) continue;

    paramNames[param] = getObjValueFromKey(getParamNames)(value)
  }

  return paramNames
}
