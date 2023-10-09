import { CollectionHandler } from "@/_db";
import { Food } from "../_consts/FoodSchema";

export const COLLECTION_NAME = 'food'
export const Collection = new CollectionHandler<Food>(COLLECTION_NAME)