import { Collection } from "./Collection"

export const deleteFile = async (id?: string) => {
  if (typeof id === 'undefined') return;
  await Collection.deleteData(id)
}