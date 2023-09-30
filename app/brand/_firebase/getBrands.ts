import { unstable_cache } from 'next/cache'
import { Collection } from "../_firebase"

export const getBrands = unstable_cache(async () => {
  const brands = await Collection.getAllData();
  return brands
},
  undefined,
  { tags: ['brands'] }
)