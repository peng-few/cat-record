import { CollectionHandler } from "@/_db";
import { FoodEntity } from "../_consts/FoodEntitySchema";

export const COLLECTION_NAME = 'food'
export const Collection = new CollectionHandler<FoodEntity>(COLLECTION_NAME)