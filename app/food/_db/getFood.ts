import { unstable_cache } from "next/cache";
import { Collection } from "./Collection"

export const getFood = unstable_cache(async (id: string) => {
  return Collection.getData(id)
}, undefined, { tags: ['food'] })

export default getFood