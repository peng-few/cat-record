import {CollectionHandler} from "@/_db/CollectionHandler";
import { Record } from "../_consts/RecordSchema";

export const COLLECTION_NAME = 'record'
export const Collection = new CollectionHandler<Record>(COLLECTION_NAME)