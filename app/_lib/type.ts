import { RegisterOptions } from "react-hook-form"

export interface AnyObject{ [x: string]: any }

export interface NoSymbolKeyObject extends AnyObject{
  [key: symbol]: never;
}


export type SelectOptions<
  Value extends string|number = string,
  Label extends string|number = string
> = {
  value: Value
  label: Label
}[]

export type FieldErrorTexts<Field extends AnyObject> = Partial<
  Record<keyof Field, RegisterOptions<Field>>
>

export type ObjectValues<O extends AnyObject> = O[keyof O] 


export type Formatter<T> = { [K in keyof T]: T[K] extends Function ?
  ((...arg:any[]) =>  ThisType<T>) : T[K] }

export type WithId<T> = T & { id: number }; 