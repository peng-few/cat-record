import { NoSymbolKeyObject, SelectOptions } from "."

export const noop = () => { }

type NoSymbolKeys<T> = keyof T extends string|number ? keyof T : string;

export const typeNamesToOptions = <T extends NoSymbolKeyObject>(data: T): SelectOptions<
NoSymbolKeys<T>,T[keyof T]> => {
  const values = Object.keys(data) as Array<NoSymbolKeys<T>>
  return values.map(value => ({
      label: data[value], value
  }))
}