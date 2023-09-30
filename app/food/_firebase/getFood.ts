import { unstable_cache } from "next/cache";
import { Collection } from "./spec"

export const getFood = unstable_cache(async (id: string) => {
  return Collection.getData(id)
}, undefined, { tags: ['food'] })

export default getFood