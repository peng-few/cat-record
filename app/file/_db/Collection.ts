import { CollectionHandler } from "@/_db";
import { File } from "./schema/FileSchema";

export const COLLECTION_NAME = 'file'
export const Collection = new CollectionHandler<File>(COLLECTION_NAME)