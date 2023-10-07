import { NoSymbolKeys,SelectOptions,NoSymbolKeyObject } from "./type";

export const objToSelectOptions = <T extends NoSymbolKeyObject>(data: T): SelectOptions<
NoSymbolKeys<T>,T[keyof T]> => {
  const values = Object.keys(data) as Array<NoSymbolKeys<T>>
  return values.map(value => ({
      label: data[value], value
  }))
}

export default objToSelectOptions;