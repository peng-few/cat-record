import {CollectionHandler} from "@/_db/CollectionHandler";
import { RecordCollectionHandler } from "./RecordCollectionHandler";

export const COLLECTION_NAME = 'record'
export const DATE_COLLECTION_NAME = 'recordDate'
export const Collection = new RecordCollectionHandler(COLLECTION_NAME)