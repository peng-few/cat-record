import { RegisterOptions } from "react-hook-form"

export type AnyObject = { [x: string]: any }

export type SelectOptions<
  Value extends string = string,
  Label extends string = string
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