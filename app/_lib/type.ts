import { Timestamp } from "firebase/firestore";
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

export interface Formatter<T>{
  data: T
}

export type WithId<T> = T & { id: string }; 
export type WithoutId<T> = Omit<T,'id'>; 

export type OverrideTimestamp<
  O extends AnyObject,
  T extends string> = Omit<O, T> & { [k in T]: Timestamp }
  

