import { z } from "zod";
import { ObjectValues } from "@/_types/types";

export const EnergyType = z.enum(['ME', 'Energy']);
export type EnergyType = z.infer<typeof EnergyType>;

export const EnergyTypeName = {
  [EnergyType.enum.ME]: '代謝能',
  [EnergyType.enum.Energy]: '熱量'
} as const satisfies Record<EnergyType, string>

export type EnergyTypeName = ObjectValues<typeof EnergyTypeName>

export const isME = (value: string) => value === EnergyType.enum.ME;

export const isEnergy = (value: string) => value === EnergyType.enum.Energy;