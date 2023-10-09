import {CollectionHandler} from "@/_db/CollectionHandler";
import { Record } from "../_consts/RecordSchema";
import { RecordDateCollectionHandler } from "./RecordDateCollectionHandler";

export const COLLECTION_NAME = 'record'
export const DATE_COLLECTION_NAME = 'recordDate'
export const Collection = new CollectionHandler<Record>(COLLECTION_NAME)
export const RecordDateCollection = new RecordDateCollectionHandler(DATE_COLLECTION_NAME)