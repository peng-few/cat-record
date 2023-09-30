import { CollectionHandler } from "@/_firebase";
import { z } from "zod";

export const COLLECTION_NAME = 'brand'
export const Collection = new CollectionHandler<FieldBrand>(COLLECTION_NAME)

export const FieldBrand = z.object({
  id: z.number(),
  name: z.string(),
})
export type FieldBrand = z.infer<typeof FieldBrand>; 