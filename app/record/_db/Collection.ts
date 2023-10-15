import {CollectionHandler} from "@/_db/CollectionHandler";
import { Record } from "./schema/RecordSchema";

export const COLLECTION_NAME = 'record'
export const Collection = new CollectionHandler<Record>(COLLECTION_NAME)