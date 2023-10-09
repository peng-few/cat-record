import { z } from "zod";
import { FoodSchema } from "./FoodSchema";
import { PhosUnitType } from "./PhosUnitType";
import { EnergyType } from "./EnergyType";
import { FoodType } from "./FoodType";

export const FoodFormRequestSchema = FoodSchema
  .omit({
    carbonhydrate: true
  })
  .extend({
    phosUnit: PhosUnitType.optional(),
    energyType: EnergyType.optional(),
  })
  .refine((data) => data.type == FoodType.Enum.Dry || data.water , {
    message: "請輸入水份",
    path: ["water"]
  })

export type FoodFormRequest = z.infer<typeof FoodFormRequestSchema>; 
