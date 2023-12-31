import { z } from "zod"
import { SelectOptions } from "@/_types/types"

export const UnitType = z.enum([ 'Percentage', 'MgPerKalorie' ])
export type UnitType = z.infer<typeof UnitType>;

export const UnitTypeName = {
  [UnitType.enum.Percentage]: '%',
  [UnitType.enum.MgPerKalorie]: 'mg/kcal'
} as const satisfies Record<UnitType,string>

export const getUnitOptions = <TUnit extends typeof UnitType.Values>
  (type: TUnit | UnitType): SelectOptions<UnitType> => {
  
  const typeNames = typeof type === 'string'
    ? [type]
    : Object.values(type)

  return typeNames.map((name) => ({
    value: name, label: UnitTypeName[name]
  }))
}

export const isPercentageUnit = (unit: string) => unit === UnitType.enum.Percentage;
export const isMgPerKalorieUnit = (unit:string) => unit === UnitType.enum.MgPerKalorie;

export default UnitType