import { unstable_cache } from 'next/cache'
import { Collection } from "./Collection"
import objectIdToString from '@/_lib/obectIdToString';

export const getBrands = unstable_cache(async () => {
  const brands = await Collection.getDatas();
  return brands
},
  undefined,
  { tags: ['brands'] }
)