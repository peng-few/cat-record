import UnitType from "@/_consts/UnitType";
import { z } from "zod";

export const PhosUnitType = z.enum([
  UnitType.enum.MgPerKalorie,
  UnitType.enum.Percentage
])

export type PhosUnitType = z.infer<typeof PhosUnitType>;
