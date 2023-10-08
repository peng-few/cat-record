import { unstable_cache } from 'next/cache'
import { collection } from "../_firebase"

export const getBrands = unstable_cache(async () => {
  const brands = await collection.getAllData();
  return brands
},
  undefined,
  { tags: ['brands'] }
)