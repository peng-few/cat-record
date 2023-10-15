import { z } from "zod";
import { FoodSchema } from "./FoodSchema";
import { PhosUnitType } from "../../_consts/PhosUnitType";
import { EnergyType } from "../../_consts/EnergyType";
import { FoodType } from "../../_consts/FoodType";
import { zSingleImage } from "@/_lib";

export const FoodFormRequestSchema = FoodSchema
  .omit({
    carbonhydrate: true,
    imgId: true
  })
  .extend({
    phosUnit: PhosUnitType.optional(),
    energyType: EnergyType.optional(),
    img: zSingleImage().optional(),
  })
  .refine((data) => data.type == FoodType.Enum.Dry || data.water , {
    message: "請輸入水份",
    path: ["water"]
  })

export type FoodFormRequest = z.infer<typeof FoodFormRequestSchema>; 
