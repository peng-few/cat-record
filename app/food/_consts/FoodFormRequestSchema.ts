import { z } from "zod";
import { FoodEntitySchema } from "./FoodEntitySchema";
import { PhosUnitType } from "./PhosUnitType";
import { EnergyType } from "./EnergyType";
import { FoodType } from "./FoodType";
import { mongoIdSchema } from "@/_data/IdSchema";

export const FoodFormRequestSchema = FoodEntitySchema
  .omit({
    carbonhydrate: true
  })
  .extend({
    phosUnit: PhosUnitType.optional(),
    energyType: EnergyType.optional(),
    _id: mongoIdSchema.optional()
  })
  .refine((data) => data.type == FoodType.Enum.Dry || data.water , {
    message: "請輸入水份",
    path: ["water"]
  })

export type FoodFormRequest = z.infer<typeof FoodFormRequestSchema>; 
