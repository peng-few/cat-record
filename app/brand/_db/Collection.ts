import { CollectionHandler } from "@/_db";
import { Brand } from "../_consts/BrandSchema";

export const COLLECTION_NAME = 'brand'
export const Collection = new CollectionHandler<Brand>(COLLECTION_NAME)