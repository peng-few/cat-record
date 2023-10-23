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
  }
} as const
export type SearchParam = typeof SearchParam
export type SearchParamType = keyof typeof SearchParam

export const getParamNames = (params: { [key in SearchParamType]?: string | string[]}) => {
  const paramNames = (Object.keys(params) as SearchParamType[]).reduce((accu, param) => {
    if(!SearchParam[param]) return accu
    return {
      ...accu,
      [param]: getObjValueFromKey(SearchParam[param])(params[param])
    }
  } ,{} as {[key in SearchParamType]?: string})
  
  return paramNames
}
