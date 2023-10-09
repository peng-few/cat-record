import { type BSON } from "mongodb";
import { z } from "zod";

export type MongoId = BSON.ObjectId
export const MongoIdSchema = z.custom<MongoId>();
