import { RegisterOptions } from "react-hook-form"
import { type BSON } from "mongodb";

export interface AnyObject{ [x: string]: any }

export type Override<T, U> = Omit<T, keyof U> & U;
export interface NoSymbolKeyObject extends AnyObject{
  [key: symbol]: never;
}
export type NoSymbolKeys<T> = keyof T extends string|number ? keyof T : string;

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
  
export interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export type FilterNumberType<Obj extends NoSymbolKeyObject> = 
  { [K in keyof Required<Obj>]: number extends Obj[K] ? K : never }[keyof Obj]

export type WithStringId<TData> = Omit<TData, '_id'> & { _id: string }

export type MongoId = BSON.ObjectId