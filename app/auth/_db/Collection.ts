import { CollectionHandler } from "@/_db";
import { User } from "./schema/UserSchema";

export const COLLECTION_NAME = 'user'
export const Collection = new CollectionHandler<User>(COLLECTION_NAME)