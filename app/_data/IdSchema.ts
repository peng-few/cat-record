import { WithId } from "mongodb";
import { z } from "zod";

export type mongoId = WithId<{}>['_id']
export const mongoIdSchema = z.custom<mongoId>();
