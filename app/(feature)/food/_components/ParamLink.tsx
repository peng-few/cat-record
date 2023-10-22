import ChipLink from "@/_components/ChipLink"
import { SearchParam,SearchParamType } from "../_consts/SearchParam"
import { refreshPage, toggleParam } from "@/_lib/searchParams/handleSearchParam"

export interface ParamLinkProps<Type extends SearchParamType>{
  type: Type ,
  value: keyof SearchParam[Type] & string,
  urlParams: URLSearchParams
}
export function ParamLink<Type extends SearchParamType>({ type, value, urlParams }: ParamLinkProps<Type>){

  return (
    <ChipLink
      label={SearchParam[type][value] as string}
      href={`/food?${refreshPage(toggleParam(new URLSearchParams(urlParams),[type,value])).toString()}`}
      selected={urlParams.has(type,value)}
    />)
}

export default ParamLink